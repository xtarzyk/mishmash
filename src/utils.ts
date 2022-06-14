import axios from 'axios'

export const getDataFromDb = async (path: string) => {
    return axios({
        method: 'GET',
        url: path
    })
    .then(res => res.data)
    .catch(err => alert(err))
}

export const removeDataElement = async (event: JQuery.ClickEvent, htmlTag: string, path: string) => {
    const selectedItem = $(event.target)
        .closest(htmlTag)
        .attr('id')

    const id = parseInt(selectedItem)

    return axios(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify({ id })
    }).catch(err => alert(err))
}