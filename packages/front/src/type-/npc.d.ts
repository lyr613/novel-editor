interface npc_vo {
    id: string
    name: string
    remark: string
    alias: string
    slices: npc_slice_vo[]
}

interface npc_slice_vo {
    start_chapter: string
    end_chapter: string
    remark: string
    /** 多维数据 */
    cube: npc_cube_vo
    /** 物品 */
    box: string[]
    /** 能力 */
    skill: string[]
    /** 关系 */
    relation: npc_relation_vo[]
}

/** 数据立方体
 * 这里的k仍然是uuid, 以便修改中文标记
 */
interface npc_cube_vo {
    [k in string]: string
}

/** 关系 */
interface npc_relation_vo {
    id: string
    remark: string
}
