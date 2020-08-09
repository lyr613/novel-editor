import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { css } from 'aphrodite'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { next_router } from '@/router'
import Shelf from './shelf'

/** Main */
export default function Main() {
    return (
        <div id="main-workspace" className={css(s.root)}>
            <Switch>
                <Route path="/shelf" component={Shelf}></Route>
                <Route component={Empty} />
            </Switch>
        </div>
    )
}

function Empty() {
    next_router('shelf')
    return null
}
