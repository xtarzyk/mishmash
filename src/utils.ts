import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export const getDataFromDb = async (path: string) => {
    return axios
        .get(path)
        .then(res => res.data)
        .catch(err => alert(err))
}

export const insertNewElement = async (body, path: string) => {
    return axios({
        method: 'POST',
        url: path,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify(body)
    })
    .catch(err => alert(err))
}

export const removeDataElement = async (event: JQuery.ClickEvent, htmlTag: string, path: string) => {
    const selectedItem = $(event.target)
        .closest(htmlTag)
        .attr('id')

    const id = parseInt(selectedItem)

    return await axios(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify({ id })
    }).catch(err => alert(err))
}
