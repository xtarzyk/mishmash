import { createIngredients, createIngredientsListFromLocalStorage, createIngredientsListFromDb } from './ingredients'
import { createRecipe, createRecipesFromLocalStorage } from './recipes'
import { Storage } from './utils'
import { showRecipes } from './mishmash'

let selectedIngredients = []
let selectedView = '.header__interface-ingredients'
const $input = $('<input type="text">').addClass('content__input')
const $addingBtn = $('<span>').text('+').addClass('adding-btn')

const createIngredientsInput = () => {
  $('.content__header').append($input.attr('placeholder', 'Add ingredient...'))
  $input.change(() => {
    createIngredients()
    $input.val('')
  })
}

const createRecipesInput = () => {
  $('.content__header').append($input.attr('placeholder', 'Add recipes...'))
  $input.change(() => {
    createRecipe(selectedIngredients)
    $input.val('')
  })
  showIngredients()
}

const showIngredients = () => {
  const receivedIngredients = Storage.get<string[]>('ingredients')
  const $ingredientList = $('<div>').addClass('content__ingredients-list').appendTo('.content__list')
  
  receivedIngredients.forEach(ingredient => {
      $('<div>')
          .addClass('content__ingredients-list-item')
          .text(ingredient)
          .click(selectIngredient)
          .appendTo($ingredientList)
  })
}

const selectIngredient = (event: JQuery.ClickEvent) => {
  if (selectedIngredients.includes($(event.target).text())) {
    selectedIngredients = selectedIngredients.filter(ing => !ing.includes($(event.target).text()))
    $(event.target).css('background', '#4e9321')
  
    if (selectedView === '.header__interface-mishmash') {
      $('.content__recipes-list').children().remove()
      showRecipes(selectedIngredients)
    }

    return
  }
  
  $(event.target).css('background', '#243535')
  selectedIngredients = selectedIngredients.concat($(event.target).text())
  
  if (selectedView === '.header__interface-mishmash') {
    $('.content__recipes-list').children().remove()
    showRecipes(selectedIngredients)
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
  // createIngredientsListFromLocalStorage()
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
  createRecipesFromLocalStorage()
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