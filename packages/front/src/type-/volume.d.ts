/** 卷 */
interface volume_vo {
    id: string
    name: string
    children: chapter_vo[]
    expand: boolean
}
/** 章 */
interface chapter_vo {
    id: string
    name: string
    /** 读取时main给加上的 */
    src: string
}
