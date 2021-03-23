import React, { useState, useEffect, useRef, Suspense } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { debounceTime, map } from 'rxjs/operators'
import { SubBookOption } from 'subject-/book-option'

/**
 * 文字编辑区
 */
export default function MonacoEdit() {
    const [wait, next_wait] = useState(true)
    const book_opt = useObservable(() => SubBookOption.option$, null)

    useEffect(() => {
        SubMonaco.did_load_monaco$.subscribe((b) => {
            if (b) {
                setTimeout(() => {
                    next_wait(false)
                }, 100)
            }
        })
    }, [])
    if (!book_opt) {
        return null
    }
    return (
        <div
            className={css(style.monaco)}
            style={{
                opacity: wait ? 0 : 1,
                left: book_opt.editer.size.x,
                top: book_opt.editer.size.y,
                width: book_opt.editer.size.w,
                height: book_opt.editer.size.h,
            }}
        >
            <Suspense fallback={null}>{!wait && <Box book_opt={book_opt} />}</Suspense>
        </div>
    )
}

interface p {
    book_opt: book_option_vo
}
function Box(p: p) {
    const ref = useRef(null as any)
    useEffect(() => {
        // console.log('load')

        const dom = ref.current
        if (!dom) {
            return
        }
        const editer_option = SubMonaco.default_option
        editer_option.dimension = {
            width: p.book_opt.editer?.size.w ?? 400,
            height: p.book_opt.editer?.size.h ?? 600,
        }
        // console.log('size', p.book_opt.editer?.size.w ?? 400, p.book_opt.editer?.size.h ?? 600)

        const editer = monaco.editor.create(dom, editer_option)
        /** 更新文本 */
        const ob_load_txt = SubVolume.chapter_use_txt$.subscribe((txt) => {
            editer.setValue(txt)
        })
        editer.onKeyUp(() => {
            const t = editer.getValue()
            const id = SubVolume.chapter_use_id$.value
            SubVolume.will_write(id, t)
        })
        // 本书的设置
        // editer.layout({
        //     width: p.book_opt.editer.size.w,
        //     height: p.book_opt.editer.size.h,
        // })

        return () => {
            ob_load_txt.unsubscribe()

            editer.dispose()
        }
    }, [p])
    return <div ref={ref} className={css(style.editer)} style={{}}></div>
}
