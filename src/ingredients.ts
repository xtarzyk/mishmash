import { Storage } from './utils'

const ingredientsSet: Set<string> = new Set()
let ingredientList: Array<Object> = new Array()

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

// export const createIngredientsListFromLocalStorage = () => {
//     const receivedIngredients = Storage.get<string[]>('ingredients')
//     console.log(receivedIngredients)
//     receivedIngredients.forEach(ingredient => {
//         ingredientsSet.add(ingredient)
//         createIngredients()
//     })
// }

export const getIngredientsListFromDb = async () => {
    const receivedIngredients = await fetch('http://localhost:3001/ingredient')
        .then(res => res.json())

    createListItems(receivedIngredients)
    ingredientList = ingredientList.concat(receivedIngredients)

    console.log(receivedIngredients)
    return receivedIngredients
}

export const updateIngredientsList = () => {
    ingredientsSet.delete(undefined)
    ingredientsSet.delete(null)
    Storage.set('ingredients', Array.from(ingredientsSet))
    $('.content__list').remove()
    $('<div>').addClass('content__list').appendTo('.content')
}

export const createIngredients = async () => {
    const name = $('.content__input').val() as string
    console.log(name)
    const insertNewIngredient = await fetch('http://localhost:3001/ingredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ name })
    })
    
    console.log(insertNewIngredient)
    return insertNewIngredient
    // ingredientsSet.add(newValue)
    // updateIngredientsList()

    // ingredientsSet.forEach(text => {
    //     const $newListItem = $('<div>').addClass('content__list-item')
    //     const $spanBtns = createSpanBtns()

    //     $newListItem
    //         .text(text)
    //         .append($spanBtns)
    //         .appendTo($('.content__list'))
    // })
}

const createListItems = ingredientList => {
    ingredientList.forEach(text => {
        const $newListItem = $('<div>').addClass('content__list-item')
        const $spanBtns = createSpanBtns()

        $newListItem
            .text(text.name)
            .append($spanBtns)
            .appendTo($('.content__list'))
    })
}

const removeIngredient = (event: JQuery.ClickEvent) => {
    const selectedItem: string = $(event.target).closest('div').text()
    const id = ingredientList.reduce((acc, ingredient) => {
        const ingredientIdIndex = 0
        const nameIndex = 1

        if (Object.values(ingredient).at(nameIndex) === selectedItem) {
            acc = Object.values(ingredient).at(ingredientIdIndex)
        }
        return acc
    }, 0)

    console.log(id)
    // console.log(Object.values(removeIngredientId).at(ingredientIdIndex))
    
    const deleteIngredient = fetch('http://localhost:3001/ingredient', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ id })
    })

    return deleteIngredient
    // ingredientsSet.delete(selectedItem)
    // Storage.set('ingredients', Array.from(ingredientsSet))
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

// createIngredientsListFromLocalStorage()
getIngredientsListFromDb()