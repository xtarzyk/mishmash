import { Storage } from './utils'

export const showRecipes = (selectedIngredients: string[]) => {
    if (localStorage.getItem('recipes') === null) {
        return
    }
    
    let result: Object
    const recipesIndex: number = 1
    const receivedRecipes: Array<Object> = Storage.get('recipes')

    result = receivedRecipes.find((recipe: Object) => {
        const arr: Array<[]> = Object.values(recipe)[recipesIndex]

        return arr.flat().every((ingredient: string) => selectedIngredients.includes(ingredient) && arr.flat().length === selectedIngredients.length)
    })

    if (result !== undefined) {
        $('.content__recipes-list').children().remove()
        $('<h2>').text(`${Object.keys(result)[recipesIndex]}`).appendTo('.content__recipes-list')
        result = {}
        
        return
    }
    $('.content__recipes-list').children().remove()
}

