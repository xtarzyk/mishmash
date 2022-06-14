import axios from 'axios'
import { ingredientList } from './ingredients'
import { Recipe } from './types/recipe'
import { Ingredient } from './types/ingredient'
import { getDataFromDb, removeDataElement } from './utils'

const allRecipesPath = 'http://localhost:3001/recipes/all'
const recipesPath = 'http://localhost:3001/recipes'
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
        // const ingredientName: string = ingredient.name
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

export const createRecipe = async (selectedIngredients: Array<number>) => {
    if(selectedIngredients.length === 0) {
        return
    }

    const $recipeName = $('.content__input').val() as string
    const $recipe = $('<div>')
        .addClass('content__recipes-list-item')
        .appendTo('.content__recipes-list')
        .text($recipeName)

    const newRecipe = { name: $recipeName, ingredientIds: selectedIngredients }

    const insertNewRecipe = await axios({
        method: 'POST',
        url: recipesPath,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify(newRecipe)
    })
    .catch(err => alert(err))

    addNewRecipeChildren(selectedIngredients, $recipe)

    return insertNewRecipe
}
