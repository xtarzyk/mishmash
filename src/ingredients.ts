import axios from 'axios'
import { Ingredient } from './types'
import { getDataFromDb, insertNewElement, removeDataElement } from './utils'

const ingredientsPath = '/ingredient'
const ingredientNameTag = 'div'

export let ingredientList: Array<Ingredient> = []

const createSpanBtns = () => {
    const $pencilIcon = $('<i>').addClass('fa-solid fa-pencil')
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    $trashIcon.click((event: JQuery.ClickEvent) => {
        removeDataElement(event, ingredientNameTag, ingredientsPath)
        $(event.target).parentsUntil($('.content__list')).remove()
    })
    $pencilIcon.click(editIngredient)
    
    return $('<span>').append($pencilIcon, $trashIcon)
}

export const createIngredientsListFromDb = async () => {
    const receivedIngredients = await getDataFromDb(ingredientsPath)

    createListItems(receivedIngredients)
    ingredientList = ingredientList.concat(receivedIngredients)

    return receivedIngredients
}

export const updateIngredientsList = () => {
    $('.content__list').remove()
    $('<div>').addClass('content__list').appendTo('.content')
}

export const createNewIngredient = async () => {
    const name = $('.content__input').val() as string
    const newIngredient = await insertNewElement({ name }, ingredientsPath)
    
    updateIngredientsList()
    createIngredientsListFromDb()

    return newIngredient
}

const createListItems = ingredientList => {
    ingredientList.forEach(ingredient => {
        const $newListItem = $('<div>').addClass('content__list-item')
        const $spanBtns = createSpanBtns()

        $newListItem
            .text(ingredient.name)
            .attr('id', `${ingredient.ingredientId}`)
            .append($spanBtns)
            .appendTo($('.content__list'))
    })
}

const patchIngredient = async (id, name: string) => {
    const editedIngredient = axios({
        method: 'PATCH',
        url: ingredientsPath,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: JSON.stringify({ id, name })
    })

    return editedIngredient
}

const editIngredient = (event: JQuery.ClickEvent) => {
    const $editionInput = $('<input type="text">').addClass('edition-input') as JQuery<HTMLInputElement>
    const $spanBtns = createSpanBtns()
    const id = $(event.target)
        .closest('div')
        .attr('id')
    
    $(event.target).closest('div').text('').append($editionInput)

    $editionInput.change(editionEvent => {
        $(editionEvent.target)
            .closest('div')
            .text(editionEvent.target.value)
            .append($spanBtns)

        patchIngredient(id, editionEvent.target.value)
    })
}

createIngredientsListFromDb()
