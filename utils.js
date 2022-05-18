export const Storage = {
    get(key) {
        if (localStorage.getItem('ingredients') !== null) {
            const data = localStorage.getItem(key)

            return JSON.parse(data)
        }
    },
    set(key, data) {
        if (typeof data !== 'string') {
            return localStorage.setItem(key, JSON.stringify(data))
        }

        localStorage.setItem(key, data)
    },
    delete(key) {

    }
}