type id_map_of<T> = Map<string, T>

interface sortable {
    /** 从名字103#xxx解析来, 没设置就Number.MAX_SAFE_INTEGER, 读取时elec-main解析 */
    readonly sort: number
    /** 从名字103#xxx解析来, 没设置就直接复制, 读取时elec-main解析 */
    readonly name_show: string
}
