export let ingredientList: Array<Object> = new Array()

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

export const getIngredientId = (selectedItem: string, ingredientList: Array<Object>) => {
    return ingredientList.reduce((acc, ingredient) => {
        const ingredientIdIndex = 0
        const nameIndex = 1

        if (Object.values(ingredient).at(nameIndex) === selectedItem) {
            acc = Object.values(ingredient).at(ingredientIdIndex)
        }

        return acc
    }, 0)
}

export const getIngredientsFromDb = async () => {
    return await fetch('http://localhost:3001/ingredient')
        .then(res => res.json())
}

export const createIngredientsListFromDb = async () => {
    const receivedIngredients = await getIngredientsFromDb()

    createListItems(receivedIngredients)
    ingredientList = ingredientList.concat(receivedIngredients)

    return receivedIngredients
}

export const updateIngredientsList = () => {
    $('.content__list').remove()
    $('<div>').addClass('content__list').appendTo('.content')
}

export const createIngredients = async () => {
    const name = $('.content__input').val() as string
    const insertNewIngredient = await fetch('http://localhost:3001/ingredient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ name })
    })
    
    updateIngredientsList()
    createIngredientsListFromDb()

    return insertNewIngredient
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
    const id = getIngredientId(selectedItem, ingredientList)

    const deleteIngredient = fetch('http://localhost:3001/ingredient', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ id })
    })

    return deleteIngredient
}

const patchIngredient = async (id, name: string) => {
    const editedIngredient = await fetch('http://localhost:3001/ingredient', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ id, name })
    })

    return editedIngredient
}

const editIngredient = (event: JQuery.ClickEvent) => {
    const $editionInput = $('<input type="text">').addClass('edition-input') as JQuery<HTMLInputElement>
    const $spanBtns = createSpanBtns()
    const name = $(event.target).closest('div').text()
    const id = getIngredientId(name, ingredientList)
    
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
