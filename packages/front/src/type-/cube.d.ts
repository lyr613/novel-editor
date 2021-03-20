/** 词条 组 */
interface cube_group_vo extends sortable {
    id: string
    name: string
    children: cube_item_vo[]
}

/** 词条 */
interface cube_item_vo extends sortable {
    id: string
    name: string
    remark: string
    level: number
}
