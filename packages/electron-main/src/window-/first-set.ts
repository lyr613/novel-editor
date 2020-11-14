import { get_main_window } from 'window-'
import url from 'url'
import path from 'path'
import { paths } from 'const-/path'

export function first_set() {
    load_page()
}

function load_page() {
    const mw = get_main_window()
    if (process.env.NODE_ENV === 'development') {
        // 开发
        try {
            mw.loadURL('https://www.baidu.com')
            // mw.loadURL('http://localhost:7098/#/')
        } catch (error) {
            console.log(error)
        }
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
