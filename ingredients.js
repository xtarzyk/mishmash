const ingredientsSet = new Set()
// ingredients = localStorage.getItem('ingredients')

// ingredients.add(setIng)
const createSpanBtns = () => {
    const $pencilIcon = $('<i>').addClass('fa-solid fa-pencil')
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can')
    
    return $('<span>').append($pencilIcon, $trashIcon)
}

const getLocalStorageData = () => {
    if (localStorage.getItem('ingredients') !== null) {
        const receivedIngredients = localStorage.getItem('ingredients').split(',')
        console.log(receivedIngredients)
        receivedIngredients.forEach(ing => {
            ingredientsSet.add(ing)
            createIngredients()
        })
    }
}

const updateIngredientsList = () => {
    ingredientsSet.add($('.content__input').val())
    localStorage.setItem('ingredients', Array.from(ingredientsSet))
    console.log(ingredientsSet)
    $('.content__list').remove()
    $('<div>').addClass('content__list').appendTo('.content')
}

export const createIngredients = () => {
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

getLocalStorageData()