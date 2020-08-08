import React, { useEffect } from 'react'
import { Menu } from './arena/menu'
import { HashRouter } from 'react-router-dom'
import Main from './arena/main'

function App() {
    const theme = 'word'
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
