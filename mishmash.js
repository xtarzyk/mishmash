import { Storage } from './utils'

let result

export const showRecipes = selectedIngredients => {
    if (localStorage.getItem('recipes') === null) {
        return
    }
    console.log(selectedIngredients)
    // let result = []
    const recipesIndex = 1
    const receivedRecipes = Storage.get('recipes')

    result = receivedRecipes.find(ingredientsArr => Object.values(ingredientsArr)[recipesIndex]
        .flat()
        .every((value) => selectedIngredients.includes(value) && Object.values(ingredientsArr)[recipesIndex].flat().length === selectedIngredients.length))

    if (result !== undefined) {
        console.log('result', result)
        $('.content__recipes-list').children().remove()
        $('<h2>').text(`${Object.keys(result)[recipesIndex]}`).appendTo('.content__recipes-list')
        result = {}
        console.log(result)
        return
    }
    $('.content__recipes-list').children().remove()
}

const checkIngredients = (ingredientsArr, selectedIngredients) => {
    return Object.values(ingredientsArr)
        .flat()
        .every((value, index) => value === selectedIngredients[index])
}
