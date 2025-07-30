let search = window.location.search
let params = new URLSearchParams(search)
let id = params.get('id')

let loadingIndicator = document.getElementById('loading')
let wrapper = document.getElementById('recipe-detail-wrapper')
wrapper.style.display = 'none'

async function fetchRecipe() {

    let response = await fetch('https://dummyjson.com/recipes/'+id)
    let data = await response.json()
    loadingIndicator.style.display = 'none'
    wrapper.style.display = 'block'
    displayRecipe(data)
}

function displayRecipe(recipe) {
    // Set the document title
    document.title = `Recipe Detail - ${recipe.name}`;

    // Update simple text and image elements
    document.getElementById('recipe-name').textContent = recipe.name;
    document.getElementById('recipe-cuisine').textContent = recipe.cuisine;
    document.getElementById('recipe-difficulty').textContent = recipe.difficulty;
    document.getElementById('recipe-rating').textContent = recipe.rating;
    document.getElementById('recipe-review-count').textContent = `(${recipe.reviewCount} reviews)`;
    document.getElementById('recipe-image').src = recipe.image;
    document.getElementById('recipe-image').alt = recipe.name;
    document.getElementById('recipe-prep-time').textContent = `${recipe.prepTimeMinutes} mins`;
    document.getElementById('recipe-cook-time').textContent = `${recipe.cookTimeMinutes} mins`;
    document.getElementById('recipe-servings').textContent = recipe.servings;
    document.getElementById('recipe-calories').textContent = `${recipe.caloriesPerServing} / serving`;

    // Populate the ingredients list
    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = ''; // Clear existing content
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    // Populate the instructions list
    const instructionsList = document.getElementById('recipe-instructions');
    instructionsList.innerHTML = ''; // Clear existing content
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });

    // Populate the tags
    const tagsContainer = document.getElementById('recipe-tags');
    tagsContainer.innerHTML = ''; // Clear existing content
    const allTags = [...recipe.tags, ...recipe.mealType]; // Combine tags and mealType
    allTags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });
}

document.addEventListener("DOMContentLoaded", fetchRecipe)