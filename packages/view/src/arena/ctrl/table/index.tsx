// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

import Show from './show'
import { Route, useRouteMatch } from 'react-router-dom'
import Edit from './edit'
import { book_use$, get_cur_book_src } from '@/source'
import { next_router } from '@/function/router'

/** 书本设定
 * 直接用编辑页面吧, 没必要单独搞一个展示页面了
 */
export default function Settings() {
    if (!get_cur_book_src()) {
        next_router('shelf')
    }
    // const { path } = useRouteMatch()!
    return <Edit />
    // return (
    // 	<>
    // 		<Route exact path={path} component={Edit}></Route>
    // 	</>
    // )
}
