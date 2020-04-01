// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { book_use$ } from '@/source'
import { next_router } from '@/function/router'
import { Route, useRouteMatch } from 'react-router-dom'
import Show from './show'
import Edit from './edit'

/**
 * 大纲
 */
export default function Outline() {
    const { path } = useRouteMatch()!

    if (!book_use$.value?.src) {
        next_router('shelf')
        return null
    }

    return (
        <>
            <Route exact path={path + '/edit'} component={Edit}></Route>
            <Route exact path={path} component={Show}></Route>
        </>
    )
}
