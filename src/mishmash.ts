import { Recipe } from './types/recipe'
import { getDataFromDb } from './utils'

const allRecipesPath = 'http://localhost:3001/recipes/all'

export const showRecipes = async (selectedIngredients: Array<number>) => {
    let result: Recipe
    const receivedRecipes: Array<Recipe> = await getDataFromDb(allRecipesPath)
    
    result = receivedRecipes.find((recipe: Recipe) => {
        const recipeIngredients = recipe.ingredients
        console.log(recipeIngredients)
        return recipeIngredients
            .every(ingredient => {
                console.log(ingredient)
                return selectedIngredients.includes(ingredient.ingredientId) && recipeIngredients.length === selectedIngredients.length
            })
            
})
    console.log(result)
    if (result !== undefined) {
        $('.content__recipes-list')
            .children()
            .remove()

        $('<h2>')
            .text(`${result.recipeName}`)
            .appendTo('.content__recipes-list')

        return
    }

    $('.content__recipes-list')
        .children()
        .remove()
}
