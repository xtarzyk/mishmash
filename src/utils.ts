export const Storage = {
    get<T>(key: string): T{
        const data = localStorage.getItem(key)
        
        return JSON.parse(data) as T
    },
    set(key: string, data: any) {
        if (typeof data !== 'string') {

            return localStorage.setItem(key, JSON.stringify(data))
        }
        localStorage.setItem(key, data)
    }
}