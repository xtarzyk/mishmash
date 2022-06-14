import { ingredientList } from './ingredients'
import { Ingredient, Recipe } from './types'
import { getDataFromDb, insertNewElement, removeDataElement } from './utils'

export const allRecipesPath = '/recipes/all'
const recipesPath = '/recipes'
const recipeName = '.recipe-name'
let recipes: Array<Recipe> = new Array()

const createTrashButton = () => {
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click(event => {
        removeDataElement(event, recipeName, recipesPath)
        $(event.target).parentsUntil($('.content__recipes-list')).remove()
    })

    return $('<span>').append($trashIcon)
}

const addRecipesChildren = (array: Array<Ingredient>, $recipe: JQuery<HTMLElement>) => {
    const $trashButton = createTrashButton()
    const $requiredIngredients = $('<section>').addClass('recipes-list-item__ingredients')

    $trashButton.appendTo($recipe)

    array.forEach(ingredient => {
        const $recipeIngredient = $('<p>').addClass('recipes-list-item__ingredients-element').text(ingredient.name)

        $requiredIngredients
            .append($recipeIngredient)
            .appendTo($recipe)
    })
}

const addNewRecipeChildren = (selectedIngredients: Array<number>, $recipe: JQuery<HTMLElement>) => {
    const $trashButton = createTrashButton()
    
    $trashButton.appendTo($recipe)
    
    selectedIngredients.forEach(id => {
        const searchedIngredient = ingredientList.find(ingredient => ingredient.ingredientId === id)
        const $requiredIngredients = $('<div>').addClass('recipes-list-item__ingredients')
        const $recipeIngredient = $('<p>').addClass('recipes-list-item__ingredients-element').text(searchedIngredient.name)

        $requiredIngredients
            .append($recipeIngredient)
            .appendTo($recipe)
    })
}

export const createRecipesFromDb = async () => {
    const receivedRecipes = await getDataFromDb(allRecipesPath)

    recipes.length = 0
    recipes = recipes.concat(receivedRecipes)
    recipes.forEach(recipe => {
        const $recipeDiv = $('<div>')
            .addClass('content__recipes-list-item')
            .appendTo('.content__recipes-list')
            .text(`${recipe.recipeName}`)
            .attr('id', `${recipe.recipeId}`)
            .addClass('recipe-name')
      
        addRecipesChildren(recipe.ingredients, $recipeDiv)
    })
}

export const createRecipe = async (selectedIngredientsId: Array<number>) => {
    if(selectedIngredientsId.length === 0) {
        return
    }

    const $recipeName = $('.content__input').val() as string
    const $recipe = $('<div>')
        .addClass('content__recipes-list-item')
        .appendTo('.content__recipes-list')
        .text($recipeName)

    const newRecipe = { 
        name: $recipeName,
        ingredientIds: selectedIngredientsId
    }
    const insertNewRecipe = await insertNewElement(newRecipe, recipesPath)

    addNewRecipeChildren(selectedIngredientsId, $recipe)

    return insertNewRecipe
}
