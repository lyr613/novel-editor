// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { find_npc_li_auto, find_chapter_li_auto, get_cur_book_src, find_incident_li_auto } from '@/source'
import { next_router } from '@/function/router'
import Show from './show'
import Edit from './edit'

/** 事件 */
export default function Incident() {
    const { path } = useRouteMatch()

    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }

    return (
        <>
            <Route exact path={path} component={Show}></Route>
            <Route exact path={path + '/edit'} component={Edit}></Route>
        </>
    )
}
