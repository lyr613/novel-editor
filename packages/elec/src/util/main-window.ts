import { BrowserWindow } from 'electron'
import { create_option } from '@/create'

/** 主窗口 */
let main_window: BrowserWindow | null

export function create_main_window() {
    main_window = new BrowserWindow(create_option())
    return main_window
}

/** 注意使用一定在创建后使用 */
export function get_main_window() {
    return main_window!
}
