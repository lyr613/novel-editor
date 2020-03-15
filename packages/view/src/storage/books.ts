import { Base } from './base'

/** 书地址列表 */
class BookSrcs extends Base<string[]> {
    public get key(): string {
        return 'book-srcs'
    }
    parse(s: string | null) {
        s = s || '[]'
        try {
            return JSON.parse(s)
        } catch (error) {
            return []
        }
    }
    stringify(v: any) {
        if (Array.isArray(v)) {
            return JSON.stringify(v)
        }
        return '[]'
    }
    /** 添加选中的路径 */
    add(src: string) {
        if (!this.value.includes(src)) {
            const narr = [...this.value, src]
            this.save(narr)
        }
    }
    /** 去除一个路径 */
    remove(src: string) {
        const narr = this.value.filter((ss) => ss !== src)
        this.save(narr)
    }
}
/** 书路径列表 */
export const book_srcs = new BookSrcs()
