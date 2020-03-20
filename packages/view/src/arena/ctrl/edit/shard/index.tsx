// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { word_count$ } from './subj'
import { sensitive_can_check$ } from '@/subject/sensitive'
import { sensitive_searched_list$, editer$ } from '../subj'
import useScroll from '@/hook/scroll-hock'

interface p {
    w: number
    h: number
}

export default function Shard(p: p) {
    const t = useObservable(() => word_count$, 0)
    const ref = useRef<null | HTMLDivElement>(null)
    useScroll(ref, 'w')

    return (
        <div
            className={s.Shard}
            ref={ref}
            style={{
                width: p.w + 'px',
                height: p.h + 'px',
            }}
        >
            字数: {t}
            <Sensitive />
        </div>
    )
}

/** 敏感词 */
function Sensitive() {
    const list = useObservable(() => sensitive_searched_list$, [])
    const can = useObservable(() => sensitive_can_check$)
    if (!list.length || !can) {
        return null
    }

    return (
        <div className={s.Sensitive}>
            <span>敏感词:</span>
            {list.map((v, i) => (
                <span
                    className={s.one}
                    key={i}
                    onClick={() => {
                        const editer = editer$.value
                        if (editer) {
                            editer.revealRangeInCenter(v.range)
                        }
                    }}
                >
                    {v.matches![0]}
                </span>
            ))}
        </div>
    )
}
