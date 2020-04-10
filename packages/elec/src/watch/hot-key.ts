import { ipcMain, app } from 'electron'

/**
 * 快捷键
 */
export function watch_hotkey(win: Electron.BrowserWindow) {
    /** 重新加载 */
    ipcMain.on('key-reload', () => {
        win.reload()
    })
    /** 退出  */
    ipcMain.on('key-quit', () => {
        app.quit()
    })
    /** 打开控制台  */
    ipcMain.on('key-devtool', () => {
        win.webContents.toggleDevTools()
    })
    /** 全屏  */
    ipcMain.on('key-full-screen', (_, force) => {
        if (force === null) {
            const b = win.isFullScreen()
            win.setFullScreen(!b)
        } else {
            win.setFullScreen(force)
        }
    })
}
