/** effect 在控制台打印 */
export function LogReport(somes: any) {
    if (process.env.NODE_ENV === 'production') {
        return
    }
    console.log('-----')
    if (Array.isArray(somes)) {
        somes.forEach((some) => {
            if (typeof some === 'object') {
                try {
                    console.table(some)
                } catch (error) {
                    console.log(some)
                }
            } else {
                console.log(some)
            }
        })
    } else {
        console.log(somes)
    }
}
