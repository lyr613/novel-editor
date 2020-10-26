import { ipcMain, screen } from 'electron'
import path from 'path'
import { reply } from './util'
import fs from 'fs'
import { get_main_window } from '@/util/main-window'

export function watch_ui() {
    /** 当前窗口全屏状态, 无参数查询, 有参数设置 */
    ipcMain.on('ui_window_full_status', ui_window_full_status)
    /** 设置窗口尺寸, 不传h认为最大化 */
    ipcMain.on('ui_window_size', ui_window_size)
    /** 退出 */
    ipcMain.on('ui_esc', ui_esc)
}

/** 当前窗口全屏状态, 无参数查询, 有参数设置 */
function ui_window_full_status(e: Electron.IpcMainEvent, b?: boolean) {
    const mw = get_main_window()
    if (b === undefined) {
        const re = mw.isFullScreen()
        reply(e, 'ui_window_full_status', re)
        return
    }
    mw.setFullScreen(b)

    reply(e, 'ui_window_full_status', b)
}

/** 设置窗口尺寸, 不传h认为最大化 */
function ui_window_size(e: Electron.IpcMainEvent, w: number, h: number) {
    const mw = get_main_window()
    const S = screen.getPrimaryDisplay().workAreaSize
    const [W, H] = [S.width, S.height]
    if (h === undefined) {
        mw.setPosition(0, 0)
        mw.setSize(W, H)
        return
    }
    mw.setPosition((W - w) / 2, (H - h) / 2)
    mw.setSize(w, h)
}

/** 退出 */
function ui_esc(e: Electron.IpcMainEvent) {
    const win = get_main_window()
    win.close()
}
