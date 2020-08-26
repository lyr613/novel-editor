import React, { useEffect } from 'react'
import { key_down$, hand_hot_key } from './subscribe/hot-key'
import { HashRouter } from 'react-router-dom'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$ } from './subject'
import { Menu } from './arena/menu'
import Ctrl from './arena/ctrl'
import { shallowCopy } from './rx/shallow-copy'
import { ipc } from './const'
import { overload_style_scroll } from './util/style-overload'
import Loading from './component/loading'
import Modal from './arena/modal'
import { auto_link_observable } from './source/auto-link'

const App: React.FC = () => {
    const eset = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const theme = eset?.common.theme ?? 'word'
    // 热键
    useEffect(() => {
        const ob = key_down$.subscribe(hand_hot_key)
        return () => ob.unsubscribe()
    }, [])
    // 加载编辑器设置
    useEffect(() => {
        const re: setting = ipc().sendSync('editer_load_setting')
        if (re) {
            editer_setting$.next(re)
        }
        overload_style_scroll()
        // console.log(re)
    }, [])
    // 自动订阅的集中管理, 不需要退订
    useEffect(() => {
        auto_link_observable()
    }, [])
    return (
        <div id="app" className={'theme-' + theme}>
            <Loading></Loading>
            <HashRouter>
                <Menu></Menu>
                <Ctrl></Ctrl>
            </HashRouter>
            <Modal />
        </div>
    )
}

export default App
