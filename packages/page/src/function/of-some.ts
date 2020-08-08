export function curry_of_some<T>(defau: T) {
    return function(source?: { [k in keyof T]: any }): T {
        return Object.assign({}, defau, source)
    }
}
