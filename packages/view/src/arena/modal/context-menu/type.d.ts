interface point {
    x: number
    y: number
}
export interface menu_config {
    position: point
    menu_list: menu_item[]
    /** 载荷, 在选择后会直接拷贝给选择结果 */
    payload?: any
}

export interface menu_item {
    key: string
    text: string
}

export interface menu_select {
    position: point
    menu_select: menu_item
    payload: any
}
