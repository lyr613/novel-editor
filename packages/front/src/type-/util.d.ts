type id_map_of<T> = Map<string, T>

interface sortable {
    /** 用户定义的名字 */
    name: string
    /** 从名字103#xxx解析来, 没设置就Number.MAX_SAFE_INTEGER, 读取时elec-main解析 */
    sort: number
    /** 从名字103#xxx解析来, 没设置就直接复制, 读取时elec-main解析 */
    name_show: string
}

interface with_id {
    id: string
}

interface with_children<T = any> extends with_id {
    children: T[]
}
