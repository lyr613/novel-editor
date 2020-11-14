import { BrowserWindow } from 'electron'
import { window_option_main } from './opt-main'

/** 主窗口 */
let main_window: BrowserWindow | null

export function create_main_window() {
    main_window = new BrowserWindow(window_option_main())
    return main_window
}

/** 获取主窗口, 如果未创建自动创建, 这在逻辑上有点问题, 因为主窗口是一定要创建的 */
export function get_main_window() {
    if (!main_window) {
        return create_main_window()
    }
    return main_window
}
