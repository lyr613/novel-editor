// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { book_use$, incident_find$, find_npc_li_auto, find_chapter_list_auto } from '@/source'
import { next_router } from '@/function/router'
import Show from './show'
import Edit from './edit'

/** 事件 */
export default function Incident() {
    const { path } = useRouteMatch()

    useEffect(() => {
        setTimeout(() => {
            find_chapter_list_auto()
            incident_find$.next()
            find_npc_li_auto()
        }, 50)
    }, [])

    if (!book_use$.value?.src) {
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
