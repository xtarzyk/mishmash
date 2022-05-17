import { Storage } from './utils'

export const showRecipes = selectedIngredients => {
    if (localStorage.getItem('recipes') === null) {
        return
    }

    const receivedRecipes = Storage.get('recipes')

    const test = receivedRecipes.forEach(recipe => {
        Object.values(recipe).some((ingredient, index) => {
           ingredient === selectedIngredients[index]
        // console.log(Object.values(recipe))
        // Object.values(recipe) === selectedIngredients
    })})
    console.log(test)
}