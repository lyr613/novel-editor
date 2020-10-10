// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { get_cur_book_src } from '@/source/book'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { next_router } from '@/router/router'

import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'

import EditUser from './edit'
import Show from './show'
import LinkGraph from './link-graph'
import Link from './link-set'
import Bar from './public/bar'

/** 角色 */
export default function Npc() {
    const { path } = useRouteMatch()!
    useEffect(() => {}, [])
    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }

    return (
        <div className={css(s.root, gs.flex, sc.wh('100%', '100%'))}>
            <Bar />
            <Switch>
                <Route path={path + '/edit'} component={EditUser}></Route>
                <Route path={path + '/link-graph'} component={LinkGraph}></Route>
                <Route path={path + '/link'} component={Link}></Route>
                <Route component={Show}></Route>
            </Switch>
        </div>
    )
}
