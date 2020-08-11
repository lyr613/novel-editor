import React, { useEffect } from 'react'
import { Menu } from './arena/menu'
import { HashRouter } from 'react-router-dom'
import Main from './arena/main'
import { key$, hand_hot_key } from './subject/hot-key'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$ } from './subject/edit-setting'
import { shallowCopy } from './util/rx-shallow-copy'
import { ipc } from './util/electron-help'
import { overload_style_scroll } from './util/style-overload'
import { auto_link_observable } from './source/auto-link'

function App() {
    const eset = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const theme = eset?.common.theme ?? 'word'

    // 热键
    useEffect(() => {
        const ob = key$.subscribe(hand_hot_key)
        return () => ob.unsubscribe()
    }, [])
    // 加载编辑器设置
    useEffect(() => {
        const re: setting_dto = ipc().sendSync('editer_load_setting')
        editer_setting$.next(re)
        overload_style_scroll()
        // console.log(re)
    }, [])
    // 自动订阅的集中管理, 不需要退订
    useEffect(() => {
        auto_link_observable()
    }, [])
    return (
        <div
            id="app"
            className={'theme-' + theme}
            style={{
                fontSize: '50px',
            }}
        >
            <HashRouter>
                <Menu />
                <Main />
            </HashRouter>
        </div>
    )
}

export default App
