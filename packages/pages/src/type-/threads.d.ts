/** 线索 */
interface threads_vo {
    items: threads_item_vo[]
    canvas: threads_canvas_vo
}

interface threads_canvas_vo {
    /** 1就是正常, 1000显示所有, 只有这两个值先 */
    zoom: number
    width: number
    height: number
}
interface threads_item_vo extends with_id {
    x: number
    y: number
    name: string
    remark: string
    link_chapter: string
    nexts: string[]
}
