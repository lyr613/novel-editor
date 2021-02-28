// eslint-disable-next-line
import EmptyRouter from 'component-/empty-router'
import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Rt } from 'router-'
import { router1 } from 'router-/define'
import Option from './option'

/** 主内容区 */
export default function MainContainer() {
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
        <div
            style={{
                overflow: 'hidden',
                flexGrow: 1,
                width: '100vw',
            }}
        >
            <Switch>
                <Route path={Rt.make('option')} component={Option}></Route>
                <Route component={EmptyRouter('/shelf')} />
            </Switch>
        </div>
    )
}
