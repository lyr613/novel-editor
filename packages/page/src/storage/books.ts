/** 存储的书本路径列表 */
export class StroageBook {
    static key = 'books'
    static find() {
        const f = localStorage.getItem(StroageBook.key) || '[]'
        try {
            let li: string[] = JSON.parse(f)
            if (!Array.isArray(li)) {
                li = []
            }
            li = li.filter((v) => typeof v === 'string')
            return li
        } catch (error) {
            return []
        }
    }
    static save(li: string[]) {
        localStorage.setItem(StroageBook.key, JSON.stringify(li))
    }
    static add(src: string) {
        const li = StroageBook.find()
        li.push(src)
        StroageBook.save(li)
    }
}
