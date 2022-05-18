import { v4 as uuidv4 } from 'uuid'
import { Storage } from './utils'

let recipes = []

const createTrashButton = () => {
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click(event => {
        recipes = recipes.filter(recipe => !Object.keys(recipe).includes($(event.target).parent().prev().text()))
        Storage.set('recipes', recipes)
        $(event.target).parentsUntil($('.content__recipes-list')).remove()
    })

    return $('<span>').append($trashIcon)
}

const addRecipeChildren = (array, $recipe) => {
    const $trashButton = createTrashButton()
    $trashButton.appendTo($recipe)

    array.forEach(ingredient => {
        const $requiredIngredients = $('<div>').addClass('recipes-list-item__ingredients')

        $requiredIngredients
            .text(ingredient)
            .appendTo($recipe)
    })
}

export const createRecipesFromLocalStorage = () => {
    if (localStorage.getItem('recipes') === null) {
        return
    }

    const receivedRecipes = Storage.get('recipes')

    recipes.length = 0
    recipes = recipes.concat(receivedRecipes)
    console.log(recipes)
    recipes.forEach(recipe => {
        const $recipeDiv = $('<div>')
            .addClass('content__recipes-list-item')
            .appendTo('.content__recipes-list')
        
        $('<h2>').text(`${Object.keys(recipe)}`).appendTo($recipeDiv)
        addRecipeChildren(recipe.selectedIngredients, $recipeDiv)
    })
}

export const createRecipe = selectedIngredients => {
    if(selectedIngredients.length === 0) {
        return
    }

    const $recipeName = $('.content__input').val()
    const newRecipe = { id: uuidv4(), [$recipeName]: selectedIngredients }
    const $recipe = $('<div>')
        .addClass('content__recipes-list-item')
        .appendTo('.content__recipes-list')
    
    recipes = recipes.concat(newRecipe)
    Storage.set('recipes', recipes)
    $('<h2>').text($recipeName).appendTo($recipe)

    addRecipeChildren(selectedIngredients ,$recipe)
}
