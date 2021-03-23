interface book_option_vo {
    id: string
    name: string
    src: string
    cover: string
    /** 最近20章 */
    last_20_chapter: string[]
    /** 编辑口的尺寸 */
    editer: {
        size: {
            x: number
            y: number
            w: number
            h: number
        }
    }
}
