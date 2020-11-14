import path from 'path'
import url from 'url'
import Electron, { globalShortcut, MenuItem, Menu, dialog, screen, app } from 'electron'

export function window_option_main(): Electron.BrowserWindowConstructorOptions {
    return {
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        // fullscreen: true,
        autoHideMenuBar: true,

        webPreferences: {
            /** 让网页获取electorn对象 */
            preload: path.resolve(app.getAppPath(), 'pre-load.js'),
            /** 查看本地图片, 设置成false才可以 */
            webSecurity: false,
            /** 允许打开控制台 */
            // devTools: true,
            devTools: process.env.NODE_ENV === 'development',
        },
        /** 显示最顶部的那一条(带最小化, 关闭的那个), windows关掉了  */
        frame: process.platform === 'darwin',
    }
}
