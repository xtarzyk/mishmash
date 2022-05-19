import { Storage } from './utils'

const ingredientsSet: Set<string> = new Set()

const createSpanBtns = () => {
    const $pencilIcon = $('<i>').addClass('fa-solid fa-pencil')
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click((event: JQuery.ClickEvent) => {
        removeIngredient(event)
        $(event.target).parentsUntil($('.content__list')).remove()
    })
    $pencilIcon.click(editIngredient)
    
    return $('<span>').append($pencilIcon, $trashIcon)
}

export const createIngredientsListFromLocalStorage = () => {
    const receivedIngredients = Storage.get<string[]>('ingredients')
    console.log(receivedIngredients)
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
    const newValue = $('.content__input').val() as string

    ingredientsSet.add(newValue)
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

const removeIngredient = (event: JQuery.ClickEvent) => {
    const selectedItem: string = $(event.target).closest('div').text()
    
    ingredientsSet.delete(selectedItem)
    Storage.set('ingredients', Array.from(ingredientsSet))
}

const editIngredient = (event: JQuery.ClickEvent) => {
    const $editionInput = $('<input type="text">').addClass('edition-input') as JQuery<HTMLInputElement>
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