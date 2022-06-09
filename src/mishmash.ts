import { Storage } from './utils'

export const showRecipes = (selectedIngredients: string[]) => {
    // if (localStorage.getItem('recipes') === null) {
    //     return
    // }
    
    let result: Object
    const recipesIndex: number = 1
    const receivedRecipes = Storage.get<Array<Object>>('recipes')

    result = receivedRecipes.find((recipe: Object) => {
        const recipeIngredients = Object.values(recipe)[recipesIndex]

        return recipeIngredients
            .flat()
            .every(ingredient => selectedIngredients.includes(ingredient) && recipeIngredients.flat().length === selectedIngredients.length)
    })

    if (result !== undefined) {
        $('.content__recipes-list').children().remove()
        $('<h2>').text(`${Object.keys(result)[recipesIndex]}`).appendTo('.content__recipes-list')
        result = {}
        
        return
    }
    $('.content__recipes-list').children().remove()
}

