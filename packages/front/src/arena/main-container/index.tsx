// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { router_pusher$ } from 'routers/pusher'
import Shelf from './shelf'

/** 主内容区 */
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
        <div
            style={{
                overflow: 'hidden',
                flexGrow: 1,
            }}
        >
            <Switch>
                <Route component={Shelf}></Route>
            </Switch>
        </div>
    )
}
