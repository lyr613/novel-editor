import { app, BrowserWindow } from 'electron'
import { watch_all } from 'watch-'
import { create_main_window } from 'window-'
import { first_set } from 'window-/first-set'

console.log(process.env.NODE_ENV)

/** 控制台中文乱码 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/** 主窗口 */
let main_window: BrowserWindow | null

function createWindow() {
    main_window = create_main_window()
    first_set()
    watch_all()

    // set_watch(main_window)

    // did_create(main_window)
    // update_check(main_window)

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

    // app.on('activate', () => {
    //     if (BrowserWindow.getAllWindows().length === 0) {
    //         createWindow()
    //     }
    // })
}
