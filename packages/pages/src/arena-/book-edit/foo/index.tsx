import React, { useState, useEffect } from 'react'
import { StyleTheme } from 'style-/theme'
import { SubBookEdit } from 'subject-/book-edit'
import style from './style.module.css'
import { DefaultButton } from '@fluentui/react'
import { take } from 'rxjs/operators'
import { SubHotKey } from 'subject-/hot-key'
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
            <FormatT />
        </div>
    )
}

/** 字数 */
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

function FormatT() {
    function _format() {
        SubBookEdit.cur_editer_txt$.pipe(take(1)).subscribe((txt) => {
            const arr = txt
                .split(/\n/)
                .map((s) => s.trim())
                .filter((s) => !!s)
                .map((s) => '　　' + s)

            const t2 = arr.join('\n\n')
            SubBookEdit.cur_editer_txt_updater$.next(t2)
        })
    }
    useEffect(() => {
        const ob = SubHotKey.event$.subscribe((k) => {
            if (k.altKey && k.keyCode === 70) {
                _format()
            }
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={style.FormatT}>
            <DefaultButton onClick={_format}>格式化</DefaultButton>
        </div>
    )
}
