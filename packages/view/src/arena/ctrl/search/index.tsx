// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { book_use$, focu_node_then_edit, get_now_node_list, chapter_list$, find_chapter_list_auto } from '@/source'
import { next_router } from '@/function/router'
import { TextField } from 'office-ui-fabric-react'
import IconButton from '@/component/icon-button'
import { Subject, BehaviorSubject } from 'rxjs'
import SectionHeader from '@/component/section-header'
import { ipc } from '@/const'
import { useObservable } from 'rxjs-hooks'
import ThemeLabel from '@/component/theme-label'
import { filter, take } from 'rxjs/operators'
import { search_text$ } from '@/subject/search'

/** 要搜索的文本 */
const search_re$ = new BehaviorSubject<p_one[]>([])
const node_line$ = new BehaviorSubject<(node & { did_match: boolean })[]>([])

/** 搜索 */
export default function Search() {
    useEffect(() => {
        const t = setTimeout(() => {
            find_chapter_list_auto()
        }, 50)
        return () => {
            clearTimeout(t)
        }
    }, [])
    if (!book_use$.value) {
        next_router('shelf')
        return null
    }
    return (
        <div className={s.Search}>
            <NodeLine />
            <Bar />
            <Result />
        </div>
    )
}

/** 顶部搜索栏 */
function Bar() {
    // const [ipt, set_ipt] = useState('')
    const ipt = useObservable(() => search_text$, '')
    useEffect(() => {
        const st = search_text$.value
        if (st) {
            ipc().send('book_search_text', book_use$.value?.src, st)
        }
    }, [])

    return (
        <div className={s.Bar}>
            <TextField
                value={ipt}
                onChange={(_, ns) => {
                    ns = ns || ''
                    search_text$.next(ns)
                }}
                onKeyPress={(e) => {
                    e.persist()
                    if (e.charCode === 13) {
                        search_text$.next(ipt)
                        navigator.clipboard.writeText(ipt)
                        ipc().send('book_search_text', book_use$.value?.src, ipt)
                    }
                }}
                className={s.ipt}
            ></TextField>
            <IconButton
                icon="Search"
                onClick={() => {
                    search_text$.next(ipt)
                    navigator.clipboard.writeText(ipt)

                    ipc().send('book_search_text', book_use$.value?.src, ipt)
                }}
            ></IconButton>
        </div>
    )
}

function NodeLine() {
    const nodes = useObservable(() => node_line$, [])
    useEffect(() => {
        // 每次搜索更新列表
        function func(_: any, re: any[]) {
            node_line$.next(re)
        }
        ipc().on('book_search_text_pers', func)
        return () => {
            ipc().removeListener('book_search_text_pers', func)
        }
    }, [])
    useEffect(() => {
        // 默认的
        if (node_line$.value.length) {
            return
        }
        chapter_list$
            .pipe(
                filter((v) => !!v.length),
                take(1),
            )
            .subscribe(() => {
                const nodes = get_now_node_list()
                const m = new Map()
                const re: any[] = nodes.filter((_, i) => {
                    const ii = ((i * 100) / nodes.length) | 0
                    if (!m.get(ii)) {
                        m.set(ii, true)
                        return true
                    }
                    return false
                })
                node_line$.next(re)
            })
    }, [])
    return (
        <div className={s.NodeLine}>
            <div className={s.box}>
                {nodes.map((nd) => (
                    <div
                        key={nd.id}
                        title={nd.name}
                        className={[s.node, nd.did_match ? s.nodehigh : ''].join(' ')}
                        onClick={() => {
                            focu_node_then_edit(nd.id)
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

/** 结果展示 */
function Result() {
    const re = useObservable(() => search_re$, [])

    useEffect(() => {
        function func(_: any, re: any[]) {
            console.log('搜索结果', re)
            search_re$.next(re)
        }
        ipc().on('book_search_text', func)
        return () => {
            ipc().removeListener('book_search_text', func)
        }
    }, [])
    return (
        <div className={s.Result}>
            {!re.length || re[0].matchs.length === 0 ? (
                <ThemeLabel add_class={[s.nore]}>没有搜索结果</ThemeLabel>
            ) : (
                re.map((v) => <One key={v.chapter.id} {...v} />)
            )}
        </div>
    )
}

interface p_one {
    chapter: chapter
    matchs: {
        node: node
        txts: string[]
    }[]
}
function One(p: p_one) {
    const [can_show_node, set_can_show_node] = useState(true)
    return (
        <div className={s.One}>
            <SectionHeader
                add_class={[s.head]}
                onClick={() => {
                    set_can_show_node(!can_show_node)
                }}
            >
                {p.chapter.name}
            </SectionHeader>
            {p.matchs.map((mch) => (
                <div
                    key={mch.node.id}
                    className={s.node}
                    style={{
                        display: can_show_node ? 'block' : 'none',
                    }}
                >
                    <div className={s.name}>
                        {mch.node.name}
                        <IconButton
                            icon="Edit"
                            add_class={[s.edit]}
                            onClick={() => {
                                focu_node_then_edit(mch.node.id)
                            }}
                        ></IconButton>
                    </div>
                    <div className={s.text}>
                        {mch.txts.map((str) => (
                            <div key={str}>{str}</div>
                        ))}
                    </div>
                </div>
            ))}
            {!can_show_node && (
                <div className={s.splitline}>
                    <span className={s.ball}></span>
                    <span className={s.ball}></span>
                    <span className={s.ball}></span>
                </div>
            )}
        </div>
    )
}
