// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import Bar from './bar'
import ListLike from './list'
import { npc_find$, find_chapter_list_auto } from '@/source'

export default function Show() {
    useEffect(() => {
        npc_find$.next()
        find_chapter_list_auto()
    }, [])
    return (
        <div className={s.Show}>
            <Bar></Bar>
            <ListLike></ListLike>
        </div>
    )
}
