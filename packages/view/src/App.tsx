import React, { useEffect } from 'react'
import { key$, hand_hot_key } from './subscribe'
import { HashRouter } from 'react-router-dom'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$ } from './subject'
import { Menu } from './arena/menu'
import Ctrl from './arena/ctrl'
import { shallowCopy } from './rx/shallow-copy'
import { ipc } from './const'

const App: React.FC = () => {
    const eset = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const theme = eset?.common.theme ?? 'word'
    useEffect(() => {
        // 热键
        const ob = key$.subscribe(hand_hot_key)
        return () => ob.unsubscribe()
    }, [])
    useEffect(() => {
        // 加载编辑器设置
        setTimeout(() => {
            const re: setting = ipc().sendSync('editer_load_setting')
            editer_setting$.next(re)
            // console.log(re)
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

// setTimeout(() => {
//     const t = `
//     ::-webkit-scrollbar {
//         width: 0px!important;
//         height: 0px!important;
//         background-color: rgba(255, 255, 255, 0.253);
//     }
//     `
//     const dm = document.createElement('style')
//     dm.innerHTML = t
//     document.head.appendChild(dm)
// }, 2000)
