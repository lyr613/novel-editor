// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { get_cur_book_src } from '@/source/book'
import { Route, useRouteMatch, Switch } from 'react-router-dom'

import EditUser from './edit'
import Show from './show'
import { next_router } from '@/router/router'
import LinkGraph from './link-graph'

/** 角色 */
export default function Npc() {
    const { path } = useRouteMatch()!
    useEffect(() => {}, [])
    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }

    return (
        <Switch>
            <Route path={path + '/edit'} component={EditUser}></Route>
            <Route path={path + '/link-graph'} component={LinkGraph}></Route>
            <Route exact path={path} component={Show}></Route>
        </Switch>
    )
}
