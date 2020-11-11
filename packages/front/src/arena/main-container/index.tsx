// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { router_pusher$ } from 'routers/pusher'

export default function MainContainer() {
    const rt = useHistory()
    useEffect(() => {
        const ob = router_pusher$.subscribe((next) => {
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
            <Route></Route>
        </Switch>
    )
}