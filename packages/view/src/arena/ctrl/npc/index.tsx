// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { book_use$, npc_li$, find_npc_li_auto, find_chapter_list_auto } from '@/source'
import { Route, useRouteMatch } from 'react-router-dom'

import EditUser from './edit'
import Show from './show'
import { next_router } from '@/function/router'

/** 角色 */
export default function Npc() {
    const { path } = useRouteMatch()!
    useEffect(() => {}, [])
    if (!book_use$.value?.src) {
        next_router('shelf')
        return null
    }

    return (
        <>
            <Route path={path + '/edit'} component={EditUser}></Route>
            <Route exact path={path} component={Show}></Route>
        </>
    )
}
