export const Storage = {
    get(key: string) {
        const data = localStorage.getItem(key)

        return JSON.parse(data)
    },
    set(key: string, data: Array<Object>) {
        if (typeof data !== 'string') {

            return localStorage.setItem(key, JSON.stringify(data))
        }
        localStorage.setItem(key, data)
    }
}