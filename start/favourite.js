let container = document.getElementById('favorites-container')
let noFavourites = document.getElementById('no-favorites-message')

function showRecipes(){
    let recipes = localStorage.getItem('recipes')
    console.log(recipes)
    if (!recipes) {
        noFavourites.classList.remove("hidden")
        return
    }
    container.innerHTML = recipes    
}

document.addEventListener("DOMContentLoaded", showRecipes)