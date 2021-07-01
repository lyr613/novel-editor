import React, { useState, useEffect } from 'react'
import { StyleTheme } from 'style-/theme'
import { SubBookEdit } from 'subject-/book-edit'
import style from './style.module.css'

/**
 */
export default function Foo() {
    return (
        <div
            className={style.Foo}
            style={{
                backgroundColor: StyleTheme.style_vars.themeLighter,
            }}
        >
            <ZiShu />
        </div>
    )
}

function ZiShu() {
    const [n, next_n] = useState(0)
    useEffect(() => {
        const ob = SubBookEdit.cur_editer_txt$.subscribe((t) => {
            const arr = t.match(/[\u4e00-\u9fa5]/g) || []
            // console.log(arr)

            next_n(arr.length)
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={style.ZiShu}>
            <div className={style.ZiShu}>字数: {n}</div>
        </div>
    )
}
