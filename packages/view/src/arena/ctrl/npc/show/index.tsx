// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import Bar from './bar'
import ListLike from './list'
import { find_npc_li_auto, find_chapter_list_auto } from '@/source'

export default function Show() {
    useEffect(() => {
        find_npc_li_auto()
        find_chapter_list_auto()
    }, [])
    return (
        <div className={s.Show}>
            <Bar></Bar>
            <ListLike></ListLike>
        </div>
    )
}
