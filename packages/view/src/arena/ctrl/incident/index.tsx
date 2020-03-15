// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { book_focu$, incident_find$, npc_find$, find_chapter_list_auto } from '@/source'
import { next_router } from '@/function/router'
import Show from './show'
import Edit from './edit'

/** 事件 */
export default function Incident() {
    const { path } = useRouteMatch()

    useEffect(() => {
        find_chapter_list_auto()
        incident_find$.next()
        npc_find$.next()
    }, [])

    if (!book_focu$.value?.src) {
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
