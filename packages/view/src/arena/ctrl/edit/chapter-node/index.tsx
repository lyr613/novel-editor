// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { Icon, ActionButton } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { map, filter, debounceTime } from 'rxjs/operators'
import { EditChapter, DeleteChapter, action_cp$, hidd_cp$, show_del_cp$ } from './edit-cp'
import { EditNode, show_node_edit$, action_nd$ } from './edit-node'
import { chapter_li$, find_chapter_li_auto, chapter_use$, save_chapter_li } from '@/source/chapter-node'
import { node_use$, node_use_buffer$, node_text_from_fs$ } from '@/source/node'
import { fs_write } from '@/source/fs-common'
import { get_cur_book_src } from '@/source/book'
import { editing_chapter$ } from '../subj'

interface p {
    w: number
    h: number
}

/**
 * 章节目录
 */
export default function ChapterNode(p: p) {
    return (
        <div
            className={s.ChapterNode}
            style={{
                width: p.w + 'px',
                height: p.h + 'px',
            }}
        >
            <Head />
            <Tree />
            <EditChapter />
            <DeleteChapter />
            <EditNode />
        </div>
    )
}

function Head() {
    const cli = useObservable(() => chapter_li$.pipe(map((li) => li.filter((v) => !v.hidden))), [])
    return (
        <div className={s.Head}>
            <span className={s.txt}>章节</span>
            <Icon
                className={s.icon}
                iconName="Settings"
                title="编辑章节"
                onClick={() => {
                    editing_chapter$.next(true)
                }}
            ></Icon>
            <Icon
                className={s.icon}
                iconName="FabricNewFolder"
                title="新章"
                onClick={() => {
                    hidd_cp$.next(false)
                }}
            ></Icon>
            {!!cli.length && (
                <Icon
                    className={s.icon}
                    iconName="AddToShoppingList"
                    title="新节"
                    onClick={() => {
                        action_nd$.next('add')
                        show_node_edit$.next(true)
                    }}
                ></Icon>
            )}
            <Icon
                className={s.icon}
                iconName="SyncOccurence"
                title="刷新"
                onClick={() => {
                    find_chapter_li_auto()
                }}
            ></Icon>
        </div>
    )
}

function Tree() {
    const list = useObservable(() => chapter_li$.pipe(map((li) => li.filter((v) => !v.hidden))), [])
    const ref = useRef<null | HTMLDivElement>(null)
    const focu_node = useObservable(() => node_use$)

    // 节聚焦时, 滚动
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const ob = node_use$
            .pipe(
                filter((v) => !!v),
                debounceTime(500),
            )
            .subscribe((node) => {
                const nd = node!
                const cps = chapter_li$.value
                // 累计章高度
                let sc_scan = -24
                let focu_chapter = null as null | chapter
                // 更改展开状态, 累计章的跳转高度
                cps.forEach((cp) => {
                    if (sc_scan < 0) {
                        if (nd.chapter_id !== cp.id) {
                            sc_scan -= 24
                        } else {
                            sc_scan = 0 - sc_scan
                            focu_chapter = cp
                        }
                    }
                    cp.expand = nd.chapter_id === cp.id
                })
                if (!focu_chapter) {
                    return
                }
                // 累计节的跳转高度
                for (const cnd of focu_chapter.children) {
                    if (cnd.id !== nd.id) {
                        sc_scan += 24
                    } else {
                        break
                    }
                }
                // console.log(focu_chapter, sc_scan)

                chapter_li$.next(cps)
                dom.scrollTo(0, sc_scan)

                // console.log(cps)
            })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={s.Tree} ref={ref}>
            {list.map((cp) => (
                <Chapter key={cp.id} cp={cp} focu_node={focu_node} />
            ))}
        </div>
    )
}

interface cp {
    cp: chapter
    focu_node: node | null
}
function Chapter(p: cp) {
    const [mouse_in, set_mouse_in] = useState(false)
    return (
        <section className={s.Chapter}>
            <header
                className={s.name}
                onClick={() => {
                    chapter_use$.next(p.cp)
                    p.cp.expand = !p.cp.expand
                    const arr = chapter_li$.value
                    chapter_li$.next(arr)
                    save_chapter_li()
                }}
                onMouseEnter={() => set_mouse_in(true)}
                onMouseLeave={() => set_mouse_in(false)}
            >
                <Icon iconName={p.cp.expand ? 'ChevronDownMed' : 'ChevronRightMed'} className={s.icon}></Icon>
                <span className={s.cname} title={p.cp.name}>
                    {p.cp.name}
                </span>
                {mouse_in && (
                    <>
                        <Icon
                            iconName="Settings"
                            className={s.iconr}
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                chapter_use$.next(p.cp)
                                action_cp$.next('change')
                                hidd_cp$.next(false)
                            }}
                            style={{ marginLeft: 'auto' }}
                        ></Icon>
                        {/* <Icon
							iconName="Delete"
							className={s.iconr}
							onClick={e => {
								e.stopPropagation()
								e.preventDefault()
								chapter_use$.next(p.cp)
								show_del_cp$.next(true)
							}}
						></Icon> */}
                    </>
                )}
            </header>
            {p.cp.expand && p.cp.children.map((nd) => <Node key={nd.id} nd={nd} cp={p.cp} focu_node={p.focu_node} />)}
        </section>
    )
}

interface nd {
    nd: node
    cp: chapter
    focu_node: node | null
}
function Node(p: nd) {
    const focu_node_id = p.focu_node?.id

    return (
        <div
            title={p.nd.name}
            className={[s.Node, p.nd.id === focu_node_id ? s.focu : ''].join(' ')}
            onClick={() => {
                chapter_use$.next(p.cp)
                node_use$.next(p.nd)
                const arr = node_use_buffer$.value
                if (!arr.find((v) => v.id === p.nd.id)) {
                    arr.push(p.nd)
                }
                node_use_buffer$.next([...arr].slice(-5))
            }}
        >
            <span className={s.ndname}>{p.nd.name}</span>
            <Icon
                iconName="Settings"
                className={s.iconr}
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    chapter_use$.next(p.cp)
                    node_use$.next(p.nd)
                    action_nd$.next('change')
                    show_node_edit$.next(true)
                }}
                style={{ marginLeft: 'auto' }}
            ></Icon>
            <Icon
                iconName="Delete"
                className={s.iconr}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                onDoubleClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    if (node_use$.value?.id === p.nd.id) {
                        node_use$.next(null)
                        node_text_from_fs$.next('')
                    }
                    const fi = p.cp.children.findIndex((v) => v.id === p.nd.id)
                    if (fi > -1) {
                        p.cp.children.splice(fi, 1)
                        const arr = chapter_li$.value
                        fs_write('json', [get_cur_book_src(), 'chapter.json'], arr)
                    }
                    find_chapter_li_auto()
                }}
                style={{ marginLeft: 'auto' }}
            ></Icon>
        </div>
    )
}
