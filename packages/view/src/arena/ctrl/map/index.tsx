// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { next_router } from '@/function/router'
import ListCtrl from './list-ctrl'
import ListShow from './list-show'
import WorkSpace from './work-space'
import Bar from './bar'
import Foo from './foo'
import { map_list_find$, map_list$ } from './subj'
import { get_cur_book_src } from '@/source/book'
import { fs_write } from '@/source/fs-common'

/** 地图 */
export default function Mapp() {
    useEffect(() => {
        map_list$.next([])
        const t = setTimeout(() => {
            if (get_cur_book_src()) {
                map_list_find$.next()
            }
        }, 50)
        return () => {
            clearTimeout(t)
            // 离开时自动保存
            fs_write('json', [get_cur_book_src(), 'map.json'], map_list$.value)
        }
    }, [])
    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }
    return (
        <div className={s.Mapp}>
            <ListCtrl />
            <ListShow />
            <Bar />
            <Foo />
            <WorkSpace />
        </div>
    )
}
