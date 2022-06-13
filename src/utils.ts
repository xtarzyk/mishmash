import axios from "axios"

export const getId = (selectedItem: string, list: Array<Object>) => {
    return list.reduce((acc, ingredient) => {
        const ingredientIdIndex = 0
        const nameIndex = 1

        if (Object.values(ingredient).at(nameIndex) === selectedItem) {
            acc = Object.values(ingredient).at(ingredientIdIndex)
        }

        return acc
    }, 0)
}

export const getDataFromDb = async (path: string) => {
    return await axios({
        method: 'GET',
        url: path
    })
    .then(res => res.data)
    .catch(err => alert(err))
}

export const removeDataElement = async (event: JQuery.ClickEvent, list: Array<Object>, htmlTag: string, path: string) => {
    const selectedItem: string = $(event.target)
        .closest(htmlTag)
        .clone()
        .children()
        .remove()
        .end()
        .text()
    const id = getId(selectedItem, list)

    return axios(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify({ id })
    }).catch(err => alert(err))
}