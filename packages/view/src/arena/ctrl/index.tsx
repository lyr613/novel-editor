// eslint-disable-next-line
import React, { useState, useEffect, Suspense } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import s from './s.module.scss'
import Shelf from './shelf'
import Edit from './edit'
import Help from './help'
import Npc from './npc'
import Outline from './outline'
import Incident from './incident'
import Option from './option'
import Zipp from './zip'
import Table from './table'
import Search from './search'
import Mapp from './map'
import Git from './git'
import { next_router } from '@/router/router'
import { load_monaco, did_monaco_load$ } from '@/plugin/monaco-editer'
import Statistics from './statistics'
import { take, filter } from 'rxjs/operators'
import ConnectPhone from './connect-phone'

export default function MainCtrl() {
    useEffect(() => {
        did_monaco_load$.pipe(filter(Boolean), take(1)).subscribe(() => {
            load_monaco()
        })
    }, [])
    return (
        <div className={s.Stage}>
            <Switch>
                <Route path="/shelf" component={Shelf} />
                <Route path="/edit" component={Edit} />
                <Route path="/help" component={Help} />
                <Route path="/npc" component={Npc} />
                <Route path="/search" component={Search} />
                <Route path="/table" component={Table} />
                <Route path="/map" component={Mapp} />
                <Route path="/git" component={Git} />
                <Route path="/incident" component={Incident} />
                <Route path="/outline" component={Outline} />
                <Route path="/option" component={Option} />
                <Route path="/zip" component={Zipp} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/connect_phone" component={ConnectPhone} />
                <Route component={Empty} />
            </Switch>
        </div>
    )
}

function Empty() {
    next_router('shelf')

    return null
}
