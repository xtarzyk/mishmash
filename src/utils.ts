export const Storage = {
    get<T>(key: string): T{
        const data: T = localStorage.getItem(key)
        
        return JSON.parse(data)
    },
    set(key: string, data: any) {
        if (typeof data !== 'string') {

            return localStorage.setItem(key, JSON.stringify(data))
        }
        localStorage.setItem(key, data)
    }
}