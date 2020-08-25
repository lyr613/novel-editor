import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { sensitive_can_check$ } from '@/subject/sensitive'
import { sensitive_searched_list$ } from '../../subj'

/** 敏感词 */
export default function Sensitive() {
    const can = useObservable(() => sensitive_can_check$)
    if (!can) {
        return null
    }

    return <List />
}

function List() {
    const list = useObservable(() => sensitive_searched_list$, [])
    if (!list.length) {
        return null
    }

    return (
        <div className={css(sc.mar(0, 10, 0, 0), sc.fts(14))}>
            <span>敏感词:</span>
            {list.map((v, i) => (
                <span
                    className={css(sc.padd(0, 10), gs.hoverfocu)}
                    key={i}
                    onClick={() => {
                        // const editer = editer$.value
                        // if (editer) {
                        //     editer.revealRangeInCenter(v.range)
                        // }
                    }}
                >
                    {v.matches![0]}
                </span>
            ))}
        </div>
    )
}
