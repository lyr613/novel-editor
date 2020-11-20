import { get_main_window } from 'window-'
import url from 'url'
import path from 'path'
import { paths } from 'const-/path'
import { envs } from 'const-/env'

export function first_set() {
    load_page()
    set_window()
}

function load_page() {
    const mw = get_main_window()
    if (envs().dev) {
        // 开发
        mw.loadURL(paths().dev_html)
    } else {
        mw.loadURL(
            url.format({
                pathname: paths().did_build_html,
                protocol: 'file:',
                slashes: true,
            }),
        )
    }
}

function set_window() {
    const mw = get_main_window()
    mw.webContents.openDevTools()
    mw.maximize()
}
