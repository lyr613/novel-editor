// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import useScroll from '@/hook/scroll-hock'
import WordCount from './word-count'
import Sensitive from './sensitive'
import { style as s } from './style'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'

interface p {
    w: number
    h: number
}

export default function Shard(p: p) {
    const ref = useRef<null | HTMLDivElement>(null)
    useScroll(ref, 'w')

    return (
        <div
            className={css(
                s.root,
                gs.flhc,
                sc.pos('absolute', undefined, undefined, 0, 0),
                gs.overhidd,
                sc.bgclrl(4),
                sc.clrl(1),
            )}
            ref={ref}
            style={{
                width: p.w + 'px',
                height: p.h + 'px',
            }}
        >
            <WordCount />
            <Sensitive />
        </div>
    )
}
