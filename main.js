import { createIngredients, getLocalStorageData } from './ingredients'
import { getIngredients } from './recipes'

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
  getIngredients()
}

$('.content__header').append($addingBtn)

$('.header__interface-ingredients').click(() => {
  $('.header__interface').children().css('background', '#4e9321')
  $('.header__interface-ingredients').css('background', '#4e93217e')
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createIngredientsInput)
  $('.content__ingredients-list').remove()
  getLocalStorageData()
})

$('.header__interface-recipes').click(() => {
  $('.header__interface').children().css('background', '#4e9321')
  $('.header__interface-recipes').css('background', '#4e93217e')
  $input.remove()
  $addingBtn.off()
  $addingBtn.click(createRecipesInput)
  $('.content__list').remove()
})

$('.header__interface-mishmash').click(() => {
  $('.header__interface').children().css('background', '#4e9321')
  $('.header__interface-mishmash').css('background', '#4e93217e')
  $input.remove()
  $('.content__list').remove()
})

$addingBtn.click(createIngredientsInput)
$('.header__interface-ingredients').css('background', '#4e93217e')