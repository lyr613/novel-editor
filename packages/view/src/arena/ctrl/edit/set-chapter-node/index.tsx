// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import Left from './left'
import Right from './right'
import { sel_node1$, sel_node2$ } from './subj'

interface p {
    w: number
    h: number
}
export default function SetChapterNode(p: p) {
    useEffect(() => {
        return () => {
            sel_node1$.next(null)
            sel_node2$.next(null)
        }
    }, [])
    return (
        <div
            className={s.SetChapterNode}
            style={{
                width: p.w + 'px',
                height: p.h + 'px',
            }}
        >
            <Left />
            <Right />
        </div>
    )
}
