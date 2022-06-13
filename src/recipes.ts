import axios from 'axios'
import { ingredientList } from './ingredients'
import { getId, getDataFromDb, removeDataElement } from './utils'

const allRecipesPath = 'http://localhost:3001/recipes/all'
const recipesPath = 'http://localhost:3001/recipes'
const recipeName = '.recipe-name'
let recipes: Array<Object> = new Array()

const createTrashButton = () => {
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click(event => {
        removeDataElement(event, recipes, recipeName, recipesPath)
        $(event.target).parentsUntil($('.content__recipes-list')).remove()
    })

    return $('<span>').append($trashIcon)
}

const addRecipesChildren = (array: Array<string>, $recipe: JQuery<HTMLElement>) => {
    const ingredientIndex = 1
    const $trashButton = createTrashButton()
    const $requiredIngredients = $('<section>').addClass('recipes-list-item__ingredients')

    $trashButton.appendTo($recipe)

    array.forEach(ingredient => {
        const ingredientName: string = Object.values(ingredient).at(ingredientIndex)
        const $recipeIngredient = $('<p>').addClass('recipes-list-item__ingredients-element').text(ingredientName)

        $requiredIngredients
            .append($recipeIngredient)
            .appendTo($recipe)
    })
}

const addNewRecipeChildren = (selectedIngredients: Array<string>, $recipe: JQuery<HTMLElement>) => {
    const $trashButton = createTrashButton()

    $trashButton.appendTo($recipe)

    selectedIngredients.forEach(ingredient => {
        const $requiredIngredients = $('<div>').addClass('recipes-list-item__ingredients')
        const $recipeIngredient = $('<p>').addClass('recipes-list-item__ingredients-element').text(ingredient)

        $requiredIngredients
            .append($recipeIngredient)
            .appendTo($recipe)
    })
}

export const createRecipesFromDb = async () => {
    const recipeIndex: number = 1
    const ingredientListIndex: number = 2
    const receivedRecipes = await getDataFromDb(allRecipesPath)

    recipes.length = 0
    recipes = recipes.concat(receivedRecipes)

    recipes.forEach(recipe => {
        const $recipeDiv = $('<div>')
            .addClass('content__recipes-list-item')
            .appendTo('.content__recipes-list')
            .text(`${Object.values(recipe)[recipeIndex]}`)
            .addClass('recipe-name')
      
        addRecipesChildren(Object.values(recipe)[ingredientListIndex], $recipeDiv)
    })
}

export const createRecipe = async (selectedIngredients: Array<string>) => {
    if(selectedIngredients.length === 0) {
        return
    }

    const $recipeName = $('.content__input').val() as string
    const $recipe = $('<div>')
        .addClass('content__recipes-list-item')
        .appendTo('.content__recipes-list')
        .text($recipeName)

    const selectedIngredientsIds = selectedIngredients.map(ingredient => getId(ingredient, ingredientList))
    const newRecipe = { name: $recipeName, ingredientIds: selectedIngredientsIds }

    recipes = recipes.concat(newRecipe)
    const insertNewRecipe = await axios({
        method: 'POST',
        url: 'http://localhost:3001/recipes',
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
