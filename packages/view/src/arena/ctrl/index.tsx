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
import { next_router } from '@/function/router'
import { load_monaco } from '@/plugin/monaco-editer'

export default function MainCtrl() {
    useEffect(() => {
        next_router('shelf')
        load_monaco()
    }, [])
    return (
        <div className={s.Stage}>
            <Suspense fallback={null}>
                <Route exact path="/shelf" component={Shelf}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route exact path="/edit" component={Edit}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route exact path="/help" component={Help}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/npc" component={Npc}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/search" component={Search}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/table" component={Table}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/map" component={Mapp}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/git" component={Git}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/incident" component={Incident}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/outline" component={Outline}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/option" component={Option}></Route>
            </Suspense>
            <Suspense fallback={null}>
                <Route path="/zip" component={Zipp}></Route>
            </Suspense>
        </div>
    )
}
