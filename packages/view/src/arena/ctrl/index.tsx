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
            <Route exact path="/shelf" component={Shelf}></Route>
            <Route exact path="/edit" component={Edit}></Route>
            <Route exact path="/help" component={Help}></Route>
            <Route path="/npc" component={Npc}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/table" component={Table}></Route>
            <Route path="/map" component={Mapp}></Route>
            <Route path="/git" component={Git}></Route>
            <Route path="/incident" component={Incident}></Route>
            <Route path="/outline" component={Outline}></Route>
            <Route path="/option" component={Option}></Route>
            <Route path="/zip" component={Zipp}></Route>
        </div>
    )
}
