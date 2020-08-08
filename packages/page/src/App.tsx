import React from 'react'
import { Menu } from './arena/menu'
import { HashRouter } from 'react-router-dom'

function App() {
    const theme = 'word'
    return (
        <div id="app" className={'theme-' + theme}>
            <HashRouter>
                <Menu />
            </HashRouter>
        </div>
    )
}

export default App
