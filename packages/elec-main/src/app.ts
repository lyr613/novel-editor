import { app, BrowserWindow } from 'electron'
import { watch_all } from 'watch-'
import { WindowUtil } from 'window-'

console.log(process.env.NODE_ENV)

/** 控制台中文乱码 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/** 主窗口 */
let main_window: BrowserWindow | null

function createWindow() {
    main_window = WindowUtil.create_main()
    watch_all()

    main_window.on('closed', () => {
        main_window = null
        app.quit()
    })
}

export function setup() {
    app.whenReady().then(createWindow)

    app.on('window-all-closed', () => {
        app.quit()
    })
}
