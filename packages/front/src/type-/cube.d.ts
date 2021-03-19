/** 词条 组 */
interface cube_group_vo {
    id: string
    name: string
    children: cube_item_vo[]
}

/** 词条 */
interface cube_item_vo {
    id: string
    name: string
    remark: string
}
