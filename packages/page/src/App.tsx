import React, { useEffect } from 'react'
import { Menu } from './arena/menu'
import { HashRouter } from 'react-router-dom'
import Main from './arena/main'
import { key$, hand_hot_key } from './subject/hot-key'

function App() {
    const theme = 'word'
    // 热键
    useEffect(() => {
        const ob = key$.subscribe(hand_hot_key)
        return () => ob.unsubscribe()
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
