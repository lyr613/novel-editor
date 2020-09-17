import { create_option } from '../create'
import { app, BrowserWindow, dialog, shell } from 'electron'
import { autoUpdater, Logger, NoOpLogger } from 'electron-updater'
import path from 'path'
import { ENV } from '@/const'
// const logfile = path.resolve('/Users/liuyiran/Desktop/front/writer', 'a.txt')
/**
 * 检查更新, 因为现在没签名, 所以直接打开release页
 * @param main_window
 */
export function update_check(main_window: BrowserWindow) {
    console.log('start')
    sendUpdateMessage('start')

    if (ENV.env === 'development') {
        return
    }
    const returnData = {
        error: {
            status: -1,
            msg: '更新时发生意外，无法进行正常更新！',
        },
        checking: {
            status: 0,
            msg: '正在检查更新……',
        },
        updateAva: {
            status: 1,
            msg: '正在升级……',
        },
        updateNotAva: {
            status: 2,
            msg: '',
        },
    }

    // autoUpdater.requestHeaders = { 'Transfer-encoding' : 'chunked'}
    autoUpdater.autoDownload = true

    //更新错误事件
    autoUpdater.on('error', (e) => {
        sendUpdateMessage({ status: -1, msg: e })
    })

    //检查事件
    autoUpdater.on('checking-for-update', function() {
        sendUpdateMessage(returnData.checking)
    })

    //发现新版本
    autoUpdater.on('update-available', (up) => {
        sendUpdateMessage(returnData.updateAva)
        autoUpdater.downloadUpdate()
    })

    //当前版本为最新版本
    autoUpdater.on('update-not-available', function() {
        setTimeout(function() {
            sendUpdateMessage(returnData.updateNotAva)
        }, 1000)
    })

    //更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
        main_window.webContents.send('download-progress', progressObj)
        // sendUpdateMessage(progressObj)
    })

    //下载完毕
    autoUpdater.on('update-downloaded', function() {
        dialog
            .showMessageBox(main_window, {
                title: '',
                message: '叮！检测到新版本',
                buttons: ['重启安装', '忽略'],
            })
            .then((res) => {
                switch (res.response) {
                    case 0:
                        autoUpdater.quitAndInstall()
                        break

                    default:
                        break
                }
            })
    })

    //发送消息给窗口
    function sendUpdateMessage(text: any) {
        main_window.webContents.send('message', text)
    }
    setTimeout(() => {
        sendUpdateMessage('checkForUpdates')
        autoUpdater.checkForUpdates()
    }, 5000)
}
