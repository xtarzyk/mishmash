import { createIngredients } from './ingredients'

const $input = $('<input type="text">').addClass('content__input')
const $addingBtn = $('<span>').text('+').addClass('adding-btn')

$('.content__header').append($input.attr('placeholder', 'Add ingredient...'), $addingBtn)

$('.header__interface-ingredients').click(() => {
  $('.content__header').append($input.attr('placeholder', 'Add ingredient...'))
})

$('.header__interface-recipes').click(() => {
  $('.content__header').append($input.attr('placeholder', 'Add recipe...'))
})

$('.header__interface-mishmash').click(() => {
  $input.remove()
})

$('.adding-btn').click(() => {
  createIngredients()
})