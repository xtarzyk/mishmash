import { createIngredients, getLocalStorageData } from './ingredients'
import { getIngredients } from './recipes'

const $input = $('<input type="text">').addClass('content__input')
const $addingBtn = $('<span>').text('+').addClass('adding-btn')

const createIngredientsInput = () => {
  $('.content__header').append($input.attr('placeholder', 'Add ingredient...'))
  $input.change(createIngredients)
}

const createRecipesInput = () => {
  $('.content__header').append($input.attr('placeholder', 'Add recipes...'))
  getIngredients()
}

$('.content__header').append($addingBtn)

$('.header__interface-ingredients').click(() => {
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createIngredientsInput)
  $('.content__ingredients-list').remove()
  getLocalStorageData()
})

$('.header__interface-recipes').click(() => {
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createRecipesInput)
  $('.content__list').remove()
})

$('.header__interface-mishmash').click(() => {
  $input.remove()
  $('.content__list').remove()
})

$addingBtn.click(createIngredientsInput)
