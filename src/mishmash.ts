import { Recipe } from './types'
import { getDataFromDb } from './utils'
import { allRecipesPath } from './recipes'

export const showRecipes = async (selectedIngredients: Array<number>) => {
    const receivedRecipes: Array<Recipe> = await getDataFromDb(allRecipesPath)
    
    const result = receivedRecipes.find((recipe: Recipe) => {
        const recipeIngredients = recipe.ingredients
        return recipeIngredients
            .every(ingredient => selectedIngredients.includes(ingredient.ingredientId))  
})

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
