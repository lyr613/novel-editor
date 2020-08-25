// eslint-disable-next-line
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import s from './s.module.scss'
import { next_router } from '@/function/router'
import ChapterNode from './chapter-node'
import Outline from './outline'
import Workspace from './workspace'
import Shard from './shard'
import { Screen$ } from '@/subscribe'
import DragLine from '@/component/drag-line'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import { find_table_li_auto } from '@/source/table'
import { editer_setting$ } from '@/subject'
import { find_npc_li_auto } from '@/source/npc'
import { find_chapter_li_auto } from '@/source/chapter-node'
import { node_use$ } from '@/source/node'
import { get_cur_book_src } from '@/source/book'
import { filter, take, debounceTime, switchMap } from 'rxjs/operators'
import { fs_write } from '@/source/fs-common'
import SetChapterNode from './set-chapter-node'
import { editing_chapter$, load_prev_buffer } from './subj'
import { node_edit_id_stack$ } from '@/source/node/stack'

/** 编辑文本页 */
export default function Edit() {
    const box_ref = useRef<null | HTMLDivElement>(null)
    const [w, set_w] = useState(0)
    const [h, set_h] = useState(0)

    // 计算各模块的宽高
    useEffect(() => {
        const dom = box_ref.current
        if (!dom) {
            return
        }

        const ob = Screen$.pipe().subscribe(() => {
            set_w(dom.clientWidth)
            set_h(dom.clientHeight)
        })
        return () => ob.unsubscribe()
    }, [])

    useEffect(() => {
        const a = setTimeout(() => {
            find_npc_li_auto()
            find_chapter_li_auto()
            find_table_li_auto()
            load_prev_buffer()
        }, 50)
        return () => {
            clearTimeout(a)
        }
    }, [])
    // 自动保存编辑的节列表
    useEffect(() => {
        const ob = node_use$
            .pipe(
                switchMap(() => node_edit_id_stack$),
                debounceTime(1000),
            )
            .subscribe((ids) => {
                const bs = get_cur_book_src()
                const use_id = node_use$.value?.id ?? ''
                const dto = {
                    ids,
                    use_id,
                }
                fs_write('json', [bs, 'prev-edit'], dto)
            })
        return () => {
            ob.unsubscribe()
            node_edit_id_stack$.next([])
            node_use$.next(null)
            editing_chapter$.next(false)
        }
    }, [])

    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }
    return (
        <div className={s.Edit} ref={box_ref}>
            {w ? <Inset w={w} h={h} /> : null}
        </div>
    )
}

interface inset {
    w: number
    h: number
}
function Inset(p: inset) {
    const Eset = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const editing_chapter = useObservable(() => editing_chapter$)

    if (!Eset) {
        return null
    }
    const lens = Eset.editer.outline_layout
    // const t = 10

    return editing_chapter ? (
        <SetChapterNode w={p.w} h={p.h} />
    ) : (
        <>
            <ChapterNode w={lens.width} h={p.h - lens.height} />
            <Outline w={lens.width} h={lens.height} />
            <Workspace w={p.w - lens.width} h={p.h - 30} />
            <Shard w={p.w - lens.width} h={30} />
            <DragLine
                datum="left"
                on_drag={drag_w}
                min={140}
                max={600}
                style={{
                    left: lens.width + 'px',
                }}
            ></DragLine>
            <DragLine
                datum="bottom"
                on_drag={drag_h}
                min={30}
                max={600}
                style={{
                    width: lens.width + 'px',
                    bottom: lens.height + 'px',
                }}
            ></DragLine>
        </>
    )
}

function drag_w(n: number) {
    const eset = editer_setting$.value
    const wh = eset.editer.outline_layout
    wh.width = n
    editer_setting$.next(eset)
}
function drag_h(n: number) {
    const eset = editer_setting$.value
    const wh = eset.editer.outline_layout
    wh.height = n
    editer_setting$.next(eset)
}
