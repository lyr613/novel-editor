import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { word_count$ } from '../../subj'

/** WordCount */
export default function WordCount() {
    const t = useObservable(() => word_count$, 0)
    return <div className={css(s.root, sc.mar(0, 10), sc.fts(14))}>字数: {t}</div>
}
