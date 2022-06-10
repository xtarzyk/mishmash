import { getRecipesFromDb } from './recipes'

export const showRecipes = async (selectedIngredients: string[]) => {
    let result: Object
    const ingredientsIndex = 2
    const recipeNameIndex = 1
    const receivedRecipes: Array<Object> = await getRecipesFromDb()
    
    result = receivedRecipes.find((recipe: Object) => {
        const recipeIngredients = Object.values(recipe)[ingredientsIndex]
        
        return recipeIngredients
            .every(ingredient => selectedIngredients.includes(ingredient.ingredientName) && recipeIngredients.length === selectedIngredients.length)
    })

    if (result !== undefined) {
        $('.content__recipes-list').children().remove()
        $('<h2>').text(`${Object.values(result)[recipeNameIndex]}`).appendTo('.content__recipes-list')
        result = {}
        
        return
    }
    $('.content__recipes-list').children().remove()
}
