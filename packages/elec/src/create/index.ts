import path from 'path'
import url from 'url'
import Electron, { globalShortcut, MenuItem, Menu, dialog, screen } from 'electron'
import { ENV } from '@/const'

export function create_option(): Electron.BrowserWindowConstructorOptions {
    return {
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        // fullscreen: true,
        autoHideMenuBar: true,

        webPreferences: {
            /** 让网页获取electorn对象 */
            preload: path.resolve(ENV.app_path, 'pre-load.js'),
            /** 查看本地图片, 设置成false才可以 */
            webSecurity: false,
            /** 允许打开控制台 */
            // devTools: true,
            devTools: process.env.NODE_ENV === 'development',
        },
        frame: false,
    }
}

/**
 * 创建结束后
 * 窗口最大化, 设置菜单, 加载页面
 */
export function did_create(win: Electron.BrowserWindow) {
    // win.maximize()
    set_menu(win)
    load_page(win)
}

/**
 * 设置菜单快捷键
 */
function set_menu(win: Electron.BrowserWindow) {
    // 重载
    const be_mac = process.platform === 'darwin'
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: '应用',
            submenu: [
                {
                    label: '重载',
                    accelerator: be_mac ? 'Command+R' : 'Alt+R',
                    role: 'reload',
                },
                {
                    label: '关于',
                    accelerator: 'CommandOrControl+T',
                    // role: 'about',
                    click: () => {
                        // dialog.showErrorBox('读取失败', '内容')
                        dialog.showMessageBox(win, {
                            type: 'info',
                            message: '编辑器作者: 秋无衣',
                        })
                    },
                },
            ],
        },
        {
            label: '编辑',
            submenu: [
                { label: '撤销', accelerator: 'CommandOrControl+Z', role: 'undo' },
                { label: '重做', accelerator: 'Shift+CommandOrControl+Z', role: 'redo' },
                { label: '剪切', accelerator: 'CommandOrControl+X', role: 'cut' },
                { label: '复制', accelerator: 'CommandOrControl+C', role: 'copy' },
                { label: '粘贴', accelerator: 'CommandOrControl+V', role: 'paste' },
                { label: '全选', accelerator: 'CommandOrControl+A', role: 'selectAll' },
            ],
        },
    ]
    const mm = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(mm)
}

/**
 * 加载页面
 */
function load_page(win: Electron.BrowserWindow) {
    // console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
        // 开发
        try {
            // win.loadURL('https://www.baidu.com')
            win.loadURL('http://localhost:7098/#/')
        } catch (error) {
            console.log(error)
        }
    } else {
        win.loadURL(
            url.format({
                pathname: path.resolve(ENV.app_path, 'build-page', 'index.html'),
                protocol: 'file:',
                slashes: true,
            }),
        )
    }
}
