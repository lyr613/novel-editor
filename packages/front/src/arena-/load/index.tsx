import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { parse } from 'query-string'
import { SubOption } from 'subject-/option'
import { Rt } from 'router-'
/**
 * #### 进入时加载
 * - 列表页
 * - 编辑页
 */
export default function FirstLoad() {
    return (
        <div className={css(style.root)}>
            <LoadList />
        </div>
    )
}

function LoadList() {
    const p = useLocation()
    const [txts, next_txts] = useState([] as string[])
    useEffect(() => {
        const so = parse(p.search)
        console.log('p', so)
        /** main是书目列表页,
         * child 选中书目的编辑页
         */
        const type = so.type as 'main' | 'child'
        let txts = []
        if (type === 'main') {
            txts.push('加载编辑器设置')
            next_txts(txts)
            // SubOption.load()
            //
            txts.push('读取书目列表')
            next_txts(txts)
            setTimeout(() => {
                Rt.next('shelf', Rt.l2shelf.show.en)
            }, 1000)
            console.log(23)
        }
        return () => {}
    }, [p])
    return (
        <div
            style={{
                padding: 10,
            }}
        >
            {txts.map((t, i) => (
                <div className={css(style.line)} key={i}>
                    {t}
                </div>
            ))}
        </div>
    )
}
