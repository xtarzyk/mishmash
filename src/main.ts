import { createNewIngredient, createIngredientsListFromDb, ingredientList } from './ingredients'
import { createRecipe, createRecipesFromDb } from './recipes'
import { showRecipes } from './mishmash'

let selectedIngredientsIDs: Array<number> = []
let selectedView = '.header__interface-ingredients'
const $input = $('<input type="text">').addClass('content__input')
const $addingBtn = $('<span>').text('+').addClass('adding-btn')

const createIngredientsInput = () => {
  $('.content__header').append($input.attr('placeholder', 'Add ingredient...'))
  $input.change(() => {
    createNewIngredient()
    $input.val('')
  })
}

const createRecipesInput = () => {
  $('.content__header').append($input.attr('placeholder', 'Add recipes...'))
  $input.change(() => {
    createRecipe(selectedIngredientsIDs)
    $input.val('')
  })
  showIngredients()
}

const showIngredients = () => {
  const $ingredientList = $('<div>').addClass('content__ingredients-list').appendTo('.content__list')
  
  ingredientList.forEach(ingredient => {
      $('<div>')
          .addClass('content__ingredients-list-item')
          .text(ingredient.name)
          .attr('id', `${ingredient.ingredientId}`)
          .click(selectIngredient)
          .appendTo($ingredientList)
  })
}

const selectIngredient = (event: JQuery.ClickEvent) => {
  const id = parseInt($(event.target).attr('id'))

  if (selectedIngredientsIDs.includes(id)) {
    selectedIngredientsIDs = selectedIngredientsIDs.filter(ing => ing !== id)
    $(event.target).css('background', '#4e9321')
  
    if (selectedView === '.header__interface-mishmash') {
      $('.content__recipes-list').children().remove()
      showRecipes(selectedIngredientsIDs)
    }

    return
  }
  
  $(event.target).css('background', '#243535')
  selectedIngredientsIDs = selectedIngredientsIDs.concat(id)
  if (selectedView === '.header__interface-mishmash') {
    $('.content__recipes-list').children().remove()
    showRecipes(selectedIngredientsIDs)
  }
}

$('.content__header').append($addingBtn)

$('.header__interface-ingredients').click(() => {
  selectedView = '.header__interface-ingredients'
  $('.header__interface').children().css('background', '#4e93217e')
  $('.header__interface-ingredients').css('background', '#4e9321')
  $('.content__header').append($addingBtn)
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createIngredientsInput)
  $('.content__list').children().remove()
  createIngredientsListFromDb()
})

$('.header__interface-recipes').click(() => {
  selectedView = '.header__interface-recipes'
  $('.header__interface').children().css('background', '#4e93217e')
  $('.header__interface-recipes').css('background', '#4e9321')
  $('.content__header').append($addingBtn)
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createRecipesInput)
  $('.content__list').children().remove()
  $('<div>').addClass('content__recipes-list').appendTo('.content__list')
  createRecipesFromDb()
})

$('.header__interface-mishmash').click(() => {
  selectedView = '.header__interface-mishmash'
  $('.header__interface').children().css('background', '#4e93217e')
  $('.header__interface-mishmash').css('background', '#4e9321')
  $input.remove()
  $addingBtn.remove()
  $('.content__list').children().remove()
  $('<div>').addClass('content__recipes-list').appendTo('.content__list')
  showIngredients()
})

$addingBtn.click(createIngredientsInput)
$('.header__interface-ingredients').css('background', '#4e9321')