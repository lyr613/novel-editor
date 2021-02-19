import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { SubOption } from 'subject-/option'
import Shelf from 'arena-/shelf'
import { Rt } from 'router-'
import BookEdit from 'arena-/book-edit'
import FirstLoad from 'arena-/load'

function App() {
    useEffect(() => {
        setTimeout(() => {
            SubOption.load()
        }, 0)
    }, [])
    return (
        <div className="App">
            <HashRouter>
                <Routebox />
            </HashRouter>
        </div>
    )
}

function Routebox() {
    const rt = useHistory()
    useEffect(() => {
        const ob = Rt.pusher$.subscribe((next) => {
            const cur = rt.location.pathname
            if (next !== cur) {
                rt.push(next)
            }
        })
        return () => {
            ob.unsubscribe()
        }
    }, [rt])
    return (
        <Switch>
            <Route path="/shelf" component={Shelf} />
            <Route path="/bookedit" component={BookEdit} />
            {/* <Route path="/load" component={FirstLoad} /> */}
        </Switch>
    )
}

export default App
