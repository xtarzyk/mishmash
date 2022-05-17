export const getLocalStorageData = () => {
    if (localStorage.getItem('ingredients') !== null) {
        const receivedIngredients = localStorage.getItem('ingredients').split(',')

        return receivedIngredients
    }
}

export const updateLocalStorage = (key, data) => {
    localStorage.setItem(key, data)
}