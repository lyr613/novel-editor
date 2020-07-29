// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import Bar from './bar'
import ListLike from './list'
import { find_npc_li_auto, find_chapter_li_auto } from '@/source'

export default function Show() {
    useEffect(() => {
        setTimeout(() => {
            // 不可以写到总的index, 编辑回来自动重查
            find_npc_li_auto()
            find_chapter_li_auto()
        }, 0)
    }, [])
    return (
        <div className={s.Show}>
            <Bar></Bar>
            <ListLike></ListLike>
        </div>
    )
}
