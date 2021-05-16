import { BrowserWindow, globalShortcut, MenuItem, Menu, dialog, screen, app } from 'electron'
import os from 'os'
import { ConstEnv } from 'const-/env'
import { ConstAppPath } from 'const-/app-path'
import url from 'url'
import path from 'path'

class _win {
    /** 主窗口 */
    main_window!: BrowserWindow
    /** 创建配置 */
    get option(): Electron.BrowserWindowConstructorOptions {
        return {
            width: os.platform() === 'win32' ? 800 : screen.getPrimaryDisplay().workAreaSize.width,
            height: os.platform() === 'win32' ? 600 : screen.getPrimaryDisplay().workAreaSize.height,
            // fullscreen: true,
            autoHideMenuBar: true,

            webPreferences: {
                /** 让网页获取electorn对象 */
                preload: path.resolve(app.getAppPath(), 'pre-load.js'),
                /** 查看本地图片, 设置成false才可以 */
                webSecurity: false,
                /** 允许打开控制台 */
                devTools: true,
                // devTools: process.env.NODE_ENV === 'development',
            },
            /** 显示最顶部的那一条(带最小化, 关闭的那个), windows关掉了  */
            frame: !!process.platform,
        }
    }
    /** 创建主窗口 */
    create_main() {
        this.main_window = new BrowserWindow(this.option)
        this.load_page(this.main_window, 'shelf')
        this.main_window.maximize()
        if (ConstEnv.dev) {
            // if (true) {
            this.main_window.webContents.openDevTools()
        }
        return this.main_window
    }
    /** 窗口加载页面 */
    load_page(win: BrowserWindow, rest_url = '') {
        if (ConstEnv.dev) {
            // 开发
            win.loadURL(ConstAppPath.dev_html + rest_url)
            console.log('加载', ConstAppPath.dev_html + rest_url)
        } else {
            const burl =
                url.format({
                    pathname: ConstAppPath.did_build_html,
                    protocol: 'file:',
                    slashes: true,
                }) +
                '#/' +
                rest_url
            win.loadURL(burl)
        }
    }
    /** id: 子窗口 */
    child_map = new Map<string, BrowserWindow | false>()
    /** id: 书目信息 */
    book_map = new Map<string, book_vo>()
}

/** 窗口类 */
export const WindowUtil = new _win()
