import { Storage } from './utils'

let result

export const showRecipes = selectedIngredients => {
    if (localStorage.getItem('recipes') === null) {
        return
    }
    console.log(selectedIngredients)
    // let result = []
    const receivedRecipes = Storage.get('recipes')

    result = receivedRecipes.find(ingredientsArr => Object.values(ingredientsArr).flat().every((value) => selectedIngredients.includes(value)))
        // if (checkIngredients(ingredientsArr, selectedIngredients)) {
        //     console.log('Hurray!')
        //     return $('<h2>').text(`${Object.keys(ingredientsArr)}`).appendTo('.content__recipes-list')
        //     // return result = result.concat(ingredientsArr)
        // }
        // console.log('checkIngredients', checkIngredients(result, selectedIngredients))
    if (result !== undefined) {
        console.log('result', result)
        $('.content__recipes-list').children().remove()
        $('<h2>').text(`${Object.keys(result)}`).appendTo('.content__recipes-list')
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
