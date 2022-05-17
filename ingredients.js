const ingredientsSet = new Set()

const createSpanBtns = () => {
    const $pencilIcon = $('<i>').addClass('fa-solid fa-pencil')
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can ing-can')
    
    $trashIcon.click(event => {
        removeIngredient(event)
        $(event.target).parentsUntil($('.content__list')).remove()
    })

    $pencilIcon.click(editIngredient)
    
    return $('<span>').append($pencilIcon, $trashIcon)
}

export const getLocalStorageData = () => {
    if (localStorage.getItem('ingredients') !== null) {
        const receivedIngredients = localStorage.getItem('ingredients').split(',')
        
        console.log(receivedIngredients)
        receivedIngredients.forEach(ing => {
            ingredientsSet.add(ing)
            createIngredients()
        })
    }
}

export const updateIngredientsList = () => {
    ingredientsSet.delete('')
    ingredientsSet.delete(undefined)
    localStorage.setItem('ingredients', Array.from(ingredientsSet))
    console.log(ingredientsSet)
    $('.content__list').remove()
    $('<div>').addClass('content__list').appendTo('.content')
}

export const createIngredients = () => {
    ingredientsSet.add($('.content__input').val())
    updateIngredientsList()

    ingredientsSet.forEach(text => {
        const $newListItem = $('<div>').addClass('content__list-item')
        const $spanBtns = createSpanBtns()
        console.log(text)
        $newListItem
            .text(text)
            .append($spanBtns)
            .appendTo($('.content__list'))
    })
}

const removeIngredient = event => {
    const selectedItem = $(event.target).closest('div').text()
    ingredientsSet.delete(selectedItem)
    localStorage.setItem('ingredients', Array.from(ingredientsSet))
    console.log(ingredientsSet)
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
        localStorage.setItem('ingredients', Array.from(ingredientsSet))
    })
}

getLocalStorageData()