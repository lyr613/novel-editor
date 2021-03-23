interface book_option_vo {
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
