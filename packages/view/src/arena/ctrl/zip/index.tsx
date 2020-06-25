// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import ThemeButton from '@/component/theme-button'
import { useObservable } from 'rxjs-hooks'
import { witch$ } from './subj'
import Import from './import'
import Exprt from './export'

/** 归档 */
export default function Zip() {
    const w = useObservable(() => witch$, 'import')
    return (
        <div className={s.Zip}>
            <Bar />
            {w === 'import' && <Import></Import>}
            {w === 'export' && <Exprt />}
        </div>
    )
}
function Bar() {
    return (
        <div className={s.Bar}>
            <ThemeButton
                add_class={[s.btn]}
                onClick={() => {
                    witch$.next('import')
                }}
            >
                {' '}
                导入
            </ThemeButton>
            <ThemeButton
                onClick={() => {
                    witch$.next('export')
                }}
            >
                {' '}
                导出
            </ThemeButton>
        </div>
    )
}
