import { createIngredients, createIngredientsListFromLocalStorage } from './ingredients'
import { showIngredients, createRecipe, createRecipesFromLocalStorage } from './recipes'

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
    createRecipe()
    $input.val('')
  })
  showIngredients()
}

$('.content__header').append($addingBtn)

$('.header__interface-ingredients').click(() => {
  $('.header__interface').children().css('background', '#4e93217e')
  $('.header__interface-ingredients').css('background', '#4e9321')
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createIngredientsInput)
  $('.content__list').children().remove()
  createIngredientsListFromLocalStorage()
})

$('.header__interface-recipes').click(() => {
  $('.header__interface').children().css('background', '#4e93217e')
  $('.header__interface-recipes').css('background', '#4e9321')
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createRecipesInput)
  $('.content__list').children().remove()
  $('<div>').addClass('content__recipes-list').appendTo('.content__list')
  createRecipesFromLocalStorage()
})

$('.header__interface-mishmash').click(() => {
  $('.header__interface').children().css('background', '#4e93217e')
  $('.header__interface-mishmash').css('background', '#4e9321')
  $input.remove()
  $('.content__list').children().remove()
})

$addingBtn.click(createIngredientsInput)
$('.header__interface-ingredients').css('background', '#4e9321')