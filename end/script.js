let limit = 8
let skip = 0
let isLoading = false;
let allRecipesLoaded = false; 

let container = document.getElementById('recipe-container')
let loadingIndicator = document.getElementById("loading")

async function fetchRecipes() {
    if (isLoading || allRecipesLoaded) return 

    isLoading = true
    loadingIndicator.style.display = 'flex'

    try {
        
        let response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`)
        if (!response.ok) {
            throw new Error("HTTP error! status: " + response.status)
        }

        const data = await response.json()
        if (data.recipes && data.recipes.length > 0)
        {
            // display here
            displayRecipes(data.recipes)
            skip += limit
        }else {
            allRecipesLoaded = true
            loadingIndicator.style.display = 'none'

        }
    } catch (error) {
        console.log("Failed to fetch recipes: " + error)
        loadingIndicator.innerHTML = '<p class="text-red-500">Failed to load recipes.</p>';
    } finally {
        isLoading = false
        if(!allRecipesLoaded) {
            loadingIndicator.style.display = 'none';
        }
    }
} 

function displayRecipes(data) {
    Array.from(data).forEach(element => {
        let template = `
            <div id='card' class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img src="${element.image}" alt="Recipe Image"
                    class="w-full h-48 object-cover">
                <div class="p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">
                    <a href="./detail.html?id=${element.id}">${element.name}</a>
                    </h2>
                    <p class="text-gray-600 mb-4">Cuisine: ${element.cuisine}</p>
                    <div class="flex items-center justify-between">
                        <span class="inline-block bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full">${element.difficulty}
                            Difficulty</span>
                        <svg class="w-6 h-6 text-gray-400 cursor-pointer favorite-icon" fill="red"
                            stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path id='like' stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        `

        container.innerHTML += template
    })
}


function handleScroll() {
    // Check if the user has scrolled to the bottom of the page
    // The '100' is a buffer, so it loads a bit before hitting the absolute bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchRecipes()
}
}

function saveRecipe(recipe) {
    let recipes = localStorage.getItem('recipes') || ''
    recipes += recipe
    localStorage.setItem('recipes', recipes)
}

document.addEventListener('scroll', handleScroll)
document.addEventListener('DOMContentLoaded', fetchRecipes);
container.addEventListener('click', (e) => {
    let current = e.target
    if(!e.target.id || !e.target.id == 'like') return

    while(current.id != 'card') {
        current = current.parentElement
    }
    alert('saved')

    let recipe = `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        ${current.innerHTML}
    </div>
    `
    saveRecipe(recipe)
})
