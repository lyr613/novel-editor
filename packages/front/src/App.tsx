import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import MenuBar from 'arena-/menu-bar'
import MainContainer from 'arena-/main-container'
import StatusFoo from 'arena-/status-foo'
import { SubOption } from 'subject-/option'
import FirstLoad from './arena-/load'

function App() {
    useEffect(() => {
        setTimeout(() => {
            SubOption.load()
        }, 0)
    }, [])
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route path="/" component={FirstLoad}></Route>
                    <MenuBar />
                    <MainContainer />
                    <StatusFoo />
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App
