import { app, BrowserWindow } from 'electron'
import { create_option, did_create } from '@/create'
import { set_watch } from './watch'
import { update_check } from './update'

console.log(process.env.NODE_ENV)

/** 控制台中文乱码 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/** 主窗口 */
let main_window: BrowserWindow | null

app.once('ready', () => {
    createWindow()
})

app.on('window-all-closed', function() {
    app.quit()
})

app.on('activate', function() {
    if (main_window === null) createWindow()
})

function createWindow() {
    main_window = new BrowserWindow(create_option())

    set_watch(main_window)

    did_create(main_window)
    update_check(main_window)

    main_window.on('closed', function() {
        main_window = null
    })
}
