import { Ingredient } from "./ingredient"

export type Recipe = {
    recipeId: number
    recipeName: string
    ingredients: Array<Ingredient>
}