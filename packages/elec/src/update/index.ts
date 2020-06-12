import { create_option } from '../create'
import { app, BrowserWindow, dialog, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'
import fs from 'fs'
import { ENV } from '@/const'

// const logfile = path.resolve('/Users/liuyiran/Desktop/front/writer', 'a.txt')
/**
 * 检查更新, 因为现在没签名, 所以直接打开release页
 * @param main_window
 */
export function update_check(main_window: BrowserWindow) {
    if (ENV.env === 'development') {
        return
    }
    // fs.writeFileSync(logfile, '开始检查')
    // autoUpdater.checkForUpdates().then((need) => {
    // console.log(need.updateInfo)
    // })
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-available', (up) => {
        // fs.writeFileSync(logfile, JSON.stringify(up))
        dialog
            .showMessageBox(main_window, {
                title: '有更新',
                message: String(up.releaseNotes).replace(/<.*>/g, ''),
                buttons: ['从系统浏览器打开', '忽略'],
            })
            .then((res) => {
                switch (res.response) {
                    case 0:
                        //     let win: any = new BrowserWindow(create_option())
                        //     win.loadURL('https://github.com/lyr613/novel-editer/releases')
                        //     win.on('close', () => (win = null))
                        //     break
                        // case 1:
                        shell.openExternal('https://github.com/lyr613/novel-editer/releases')
                        break

                    default:
                        break
                }
            })
    })
    autoUpdater.on('error', (e) => {
        dialog.showMessageBox(main_window, {
            title: '更新错误',
            message: e,
        })
    })
}
