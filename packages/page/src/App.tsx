import React, { useEffect } from 'react'
import { Menu } from './arena/menu'
import { HashRouter } from 'react-router-dom'

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
                {/* <Menu /> */}
            </HashRouter>
        </div>
    )
}

export default App
