export function sleep(n: number) {
    return new Promise((suc) => {
        setTimeout(() => {
            suc()
        }, n)
    })
}
