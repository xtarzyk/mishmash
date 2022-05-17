import { Storage } from './utils'

let selectedIngredients = []

const createTrashBtn = () => {
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    return $('<span>').append($trashIcon)
}

export const showIngredients = () => {
    const receivedIngredients = Storage.get()
    const $ingredientList = $('<div>').addClass('content__ingredients-list').appendTo('.content')
    
    receivedIngredients.forEach(ing => {
        $('<div>')
            .addClass('content__ingredients-list-item')
            .text(ing)
            .click(selectIng)
            .appendTo($ingredientList)
    })
}

const selectIng = event => {
    if (selectedIngredients.includes($(event.target).text())) {
        selectedIngredients = selectedIngredients.filter(ing => !ing.includes($(event.target).text()))
        $(event.target).css('background', '#4e9321')
        
        return
    }
    $(event.target).css('background', '#243535')
    selectedIngredients = selectedIngredients.concat($(event.target).text())
    console.log(selectedIngredients)
}

const createRecipe = () => {
    if(selectedIngredients.length === 0) {

        return
    }
    const $recipesList = $('<div>').addClass('content__recipes-list').appendTo('.content')

    selectedIngredients.forEach(ing => {

    })
}