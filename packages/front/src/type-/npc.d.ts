interface npc_vo extends sortable {
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
    cube: cube_group_vo[]
    /** 关系 */
    relation: npc_relation_vo[]
}

/** 关系 */
interface npc_relation_vo {
    id: string
    remark: string
}
