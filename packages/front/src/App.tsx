import React, { useState, useEffect } from 'react'
import Some from 'arena/ttt'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { router_pusher$ } from 'routers/pusher'
import MenuBar from 'arena/menu-bar'
import MainContainer from 'arena/main-container'
import StatusFoo from 'arena/status-foo'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <MenuBar />
                <MainContainer />
                <StatusFoo />
            </HashRouter>
        </div>
    )
}

export default App
