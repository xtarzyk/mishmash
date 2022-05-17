import { Storage } from './utils'

let selectedIngredients = []
let recipes = []

const createTrashButton = () => {
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click(event => {
        console.log($(event.target).siblings('h2').text())
        recipes = recipes.filter(recipe => Object.keys(recipe) !== $(event.target).siblings('h2').text())
        console.log(recipes)
        Storage.set('recipes', recipes)
        $(event.target).parentsUntil($('.content__recipes-list')).remove()
    })
    return $('<span>').append($trashIcon)
}

const addRecipeIngredients = (array, $recipe) => {
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
    const receivedRecipes = Storage.get('recipes')
    
    recipes = recipes.concat(receivedRecipes)
    
    recipes.forEach(recipe => {
        const $recipeDiv = $('<div>')
            .addClass('content__recipes-list-item')
            .appendTo('.content__recipes-list')
        
        $('<h2>').text(`${Object.keys(recipe)}`).appendTo($recipeDiv)
        addRecipeIngredients(Object.values(recipe), $recipeDiv)
    })
}

export const showIngredients = () => {
    const receivedIngredients = Storage.get('ingredients')
    const $ingredientList = $('<div>').addClass('content__ingredients-list').appendTo('.content__list')
    
    receivedIngredients.forEach(ingredient => {
        $('<div>')
            .addClass('content__ingredients-list-item')
            .text(ingredient)
            .click(selectIngredient)
            .appendTo($ingredientList)
    })
}

const selectIngredient = event => {
    if (selectedIngredients.includes($(event.target).text())) {
        selectedIngredients = selectedIngredients.filter(ing => !ing.includes($(event.target).text()))
        $(event.target).css('background', '#4e9321')
        
        return
    }
    $(event.target).css('background', '#243535')
    selectedIngredients = selectedIngredients.concat($(event.target).text())
    console.log(selectedIngredients)
}

export const createRecipe = () => {
    if(selectedIngredients.length === 0) {
        return
    }

    const $recipeName = $('.content__input').val()
    const newRecipe = { [$recipeName]: selectedIngredients }
    const $recipe = $('<div>')
        .addClass('content__recipes-list-item')
        .appendTo('.content__recipes-list')
    
    recipes = recipes.concat(newRecipe)
    Storage.set('recipes', recipes)
    $('<h2>').text($recipeName).appendTo($recipe)

    addRecipeIngredients(selectedIngredients ,$recipe)
    $('<div>').addClass('content__list').appendTo('.content')
}
