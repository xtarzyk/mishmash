let selectedIngredients = []

const createTrashBtn = () => {
    const $trashIcon = $('<i>').addClass('fa-solid fa-trash-can ing-can')
    
    // $trashIcon.click(event => {
    //     removeIngredient(event)
    //     $(event.target).parentsUntil($('.content__list')).remove()
    //   })
    
    return $('<span>').append($trashIcon)
}

export const getIngredients = () => {
    if (localStorage.getItem('ingredients') !== null) {
        const $ingredientList = $('<div>').addClass('content__ingredients-list').appendTo('.content')
        const receivedIngredients = localStorage.getItem('ingredients').split(',')
        
        receivedIngredients.forEach(ing => {
            $('<div>')
                .addClass('content__ingredients-list-item')
                .text(ing)
                .click(selectIng)
                .appendTo($ingredientList)
        })
    }
}

const selectIng = event => {
    $(event.target).css('background', '#243535')
    if (selectedIngredients.includes($(event.target).text())) {
        selectedIngredients = selectedIngredients.filter(ing => !ing.includes($(event.target).text()))
        $(event.target).css('background', '#4e9321')
        return
    }
    selectedIngredients = selectedIngredients.concat($(event.target).text())
    console.log(selectedIngredients)
}

const createRecipe = () => {
    if(selectedIngredients.length === 0) {

        return
    }
    const $recipesList = $('<div>').addClass('content__recipes-list').appendTo('.content')
}