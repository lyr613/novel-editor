import React, { useEffect } from 'react'
import { key$ } from './subscribe'
import { ipc } from './const'
import { HashRouter } from 'react-router-dom'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$, load_edit_set } from './subject'
import { Menu } from './arena/menu'
import Ctrl from './arena/ctrl'
import { shallowCopy } from './rx/shallow-copy'

let wait_quit = false

const App: React.FC = () => {
    const eset = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const theme = eset?.common.theme ?? 'word'
    useEffect(() => {
        // 热键
        const ob = key$.subscribe((e) => {
            // alt + r 重载
            if (e.code === 82 && e.alt) {
                ipc().send('key-reload')
            }
            // alt + q 退出
            if (e.code === 81 && e.alt) {
                if (wait_quit) {
                    ipc().send('key-quit')
                } else {
                    wait_quit = true
                    setTimeout(() => {
                        wait_quit = false
                    }, 2000)
                }
            }
            // alt + i 控制台
            if (e.code === 73 && e.alt) {
                ipc().send('key-devtool')
            }
            // console.log(e)
        })
        return () => ob.unsubscribe()
    }, [])
    useEffect(() => {
        // 加载编辑器设置
        setTimeout(() => {
            editer_setting$.next(load_edit_set())
        }, 20)
    }, [])
    return (
        <div id="app" className={'theme-' + theme}>
            <HashRouter>
                <Menu></Menu>
                <Ctrl></Ctrl>
            </HashRouter>
        </div>
    )
}

export default App
