import { Storage } from './utils'

const ingredientsSet = new Set()

const createSpanBtns = () => {
    const $pencilIcon = $('<i>').addClass('fa-solid fa-pencil')
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click(event => {
        removeIngredient(event)
        $(event.target).parentsUntil($('.content__list')).remove()
    })
    $pencilIcon.click(editIngredient)
    
    return $('<span>').append($pencilIcon, $trashIcon)
}

export const createIngredientsListFromLocalStorage = () => {
    const receivedIngredients = Storage.get('ingredients')

    receivedIngredients.forEach(ingredient => {
        ingredientsSet.add(ingredient)
        createIngredients()
    })
}

export const updateIngredientsList = () => {
    ingredientsSet.delete(undefined)
    ingredientsSet.delete(null)
    Storage.set('ingredients', Array.from(ingredientsSet))
    $('.content__list').remove()
    $('<div>').addClass('content__list').appendTo('.content')
}

export const createIngredients = () => {
    ingredientsSet.add($('.content__input').val())
    updateIngredientsList()

    ingredientsSet.forEach(text => {
        const $newListItem = $('<div>').addClass('content__list-item')
        const $spanBtns = createSpanBtns()
        $newListItem
            .text(text)
            .append($spanBtns)
            .appendTo($('.content__list'))
    })
}

const removeIngredient = event => {
    const selectedItem = $(event.target).closest('div').text()
    
    ingredientsSet.delete(selectedItem)
    Storage.set('ingredients', Array.from(ingredientsSet))
}

const editIngredient = event => {
    const $editionInput = $('<input type="text">').addClass('edition-input')
    const $spanBtns = createSpanBtns()
    
    ingredientsSet.delete($(event.target).closest('div').text())
    $(event.target).closest('div').text('').append($editionInput)

    $editionInput.change(editionEvent => {
        $(editionEvent.target)
            .closest('div')
            .text(editionEvent.target.value)
            .append($spanBtns)

        ingredientsSet.add(editionEvent.target.value)
        Storage.set('ingredients', Array.from(ingredientsSet))
    })
}

createIngredientsListFromLocalStorage()