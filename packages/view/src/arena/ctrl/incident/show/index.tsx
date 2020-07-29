// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { Icon, ActionButton, TextField } from 'office-ui-fabric-react'
import { next_router } from '@/function/router'
import { incident_use$, of_incident, incident_li$, incident_use_id$, incident_edit$ } from '@/source/incident'
import { useObservable } from 'rxjs-hooks'
import { npc_map$, find_npc_li_auto, book_use$, get_now_node_list, fs_write, get_cur_book_src } from '@/source'
import { incident_list_filted$, filter$ } from './subj'
import ThemeButton from '@/component/theme-button'
import { shallowCopy } from '@/rx/shallow-copy'
import { ipc } from '@/const'
import IconButton from '@/component/icon-button'
import { BehaviorSubject, Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

/** 事件展示 */
export default function Show() {
    useEffect(() => {}, [])
    return (
        <div className={s.Show}>
            <TimeLine />
            <Action />
            <List />
        </div>
    )
}

/** 统计完字数需要更新视图 */
const update_list_view$ = new Subject()
/** 双击节奏线, 滚动视图展示选中的 */
const view_focu$ = new Subject<string>()

/** 主进程传来的字数统计 */
interface node_word_c {
    /** 本章字数, 此章之前累计字数 */
    [id: string]: [number, number]
}
interface line_incidents {
    incident: incident
    start_word: number
    end_word: number
    /** 百分比整数 */
    left: number
    right: number
    width: number
}

/** 节奏线索 */
function TimeLine() {
    const [show, set_show] = useState<line_incidents[][]>([])
    const focu = useObservable(() => incident_use$)
    useEffect(() => {
        // 这里加个延时, 先加载底下的列表
        const ob = incident_li$.pipe(shallowCopy(), debounceTime(200)).subscribe((li) => {
            if (!li.length) {
                set_show([])
                return
            }
            /** 实际上是结果 */
            const line_incidents: line_incidents[][] = []
            // 获取每节的字数
            const nodes = get_now_node_list()
            ipc().send('bookc_node_words', get_cur_book_src(), nodes)
            ipc().once('bookc_node_words', (_, mp: node_word_c) => {
                /** 总字数 */
                if (!mp || !mp.all) {
                    return
                }
                const sum = mp.all[0]
                if (sum <= 0) {
                    set_show([])
                    return
                }
                li.forEach((inci) => {
                    const i = inci.link_line.index
                    if (!line_incidents[i]) {
                        line_incidents[i] = []
                    }
                    // 每一章计算位置信息
                    const start_hand = mp[inci.link_line.start_node_id] || [0, 0]
                    const end_hand = mp[inci.link_line.end_node_id] || [0, 0]
                    const obj: line_incidents = {
                        incident: inci,
                        start_word: start_hand[1],
                        end_word: end_hand[0] + end_hand[1],
                        left: 0,
                        right: 0,
                        width: 0,
                    }
                    inci.word.real = obj.end_word - obj.start_word
                    obj.left = Math.min(99, ((obj.start_word / sum) * 100) | 0)
                    obj.right = Math.min(100, ((obj.end_word / sum) * 100) | 0)
                    obj.width = Math.max(1, obj.right - obj.left)
                    line_incidents[i].push(obj)
                })
                set_show(line_incidents)
                update_list_view$.next(Math.random())

                // console.log(nodes)
            })
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={s.TimeLine}>
            {show.map((line, y) => (
                <div className={s.line} key={y}>
                    <span className={s.linename}>{_link_name_map(y)}</span>
                    {line.map((one) => (
                        <div
                            title={one.incident.label}
                            key={one.incident.id}
                            className={[s.hline, focu?.id === one.incident.id ? s.foculine : ''].join(' ')}
                            onClick={() => {
                                incident_use_id$.next(one.incident.id)
                            }}
                            onDoubleClick={() => {
                                view_focu$.next(one.incident.id)
                            }}
                            style={{
                                left: one.left + '%',
                                width: one.width + '%',
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

function _link_name_map(n: number) {
    if (n === 0) {
        return '独立事件'
    }
    return '线索' + n
}
/** 操作: 名字过滤和新事件 */
function Action() {
    const fil = useObservable(() => filter$.pipe(shallowCopy()))
    if (!fil) {
        return null
    }
    return (
        <div className={s.Action}>
            <ThemeButton
                onClick={() => {
                    incident_use_id$.next('')
                    next_router('incident', 'edit')
                }}
            >
                新事件
            </ThemeButton>
            <TextField
                placeholder="搜索"
                value={fil.label}
                onChange={(_, str) => {
                    fil.label = str || ''
                    filter$.next(fil)
                }}
                onFocus={() => {
                    fil.label = ''
                    filter$.next(fil)
                }}
            ></TextField>
        </div>
    )
}

/** 列表部分 */
function List() {
    const list = useObservable(() => incident_list_filted$, [])
    const focu = useObservable(() => incident_use$)
    const refbox = useRef<null | HTMLDivElement>(null)
    // 更新视图用: 比如统计完字数
    useObservable(() => update_list_view$)

    const npc_map = useObservable(() => npc_map$)
    useEffect(() => {
        // 观测双击传来的id, 滚动视图
        const dom = refbox.current
        if (!dom || !list.length) {
            return
        }
        const ob = view_focu$.subscribe((id) => {
            const cds = dom.childNodes
            let hscan = 0
            for (let i = 0; i < cds.length; i++) {
                const incidom = cds[i] as HTMLDivElement
                if (incidom.id === id) {
                    dom.scrollTo(0, hscan)
                    break
                }
                hscan += incidom.clientHeight + 10
            }
        })
        return () => ob.unsubscribe()
    }, [list])

    if (!npc_map) {
        return null
    }
    return (
        <div className={s.List} ref={refbox}>
            {list.map((incident) => (
                <section
                    className={s.One}
                    key={incident.id}
                    id={incident.id}
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        incident_use_id$.next(incident.id)
                    }}
                >
                    <div className={[s.title, focu?.id === incident.id ? s.titlefocu : ''].join(' ')}>
                        <span>{incident.label}</span>
                        <span className={s.life}>
                            <span>{incident.life.slice(0, 3).join('/')}</span>
                            <span> ~ </span>
                            <span>{incident.life.slice(-3).join('/')}</span>
                        </span>
                        <IconButton
                            icon="Settings"
                            add_class={[s.iconset]}
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                incident_use_id$.next(incident.id)
                                next_router('incident', 'edit')
                            }}
                        ></IconButton>
                        <IconButton
                            icon="Delete"
                            add_class={[s.icondel]}
                            onDoubleClick={() => {
                                const arr = incident_li$.value
                                const narr = arr.filter((v) => v.id !== incident.id)
                                incident_li$.next(narr)
                                fs_write('json', [get_cur_book_src(), 'incident.json'], narr)
                            }}
                        ></IconButton>
                    </div>
                    <div className={s.text}>{incident.text}</div>
                    <div className={s.line}></div>
                    <div className={s.words}>
                        <span>字数跨度: </span>
                        <span>预期 </span>
                        <span className={s.w2}>{incident.word.preset}</span>
                        <span>实际 </span>
                        <span className={s.w2}>{incident.word.real}</span>
                        <span>相差 </span>
                        <span>{Math.abs(incident.word.real - incident.word.preset)}</span>
                    </div>
                    <div className={s.line}></div>
                    <div className={s.npc}>
                        <span>相关角色:</span>
                        <div className={s.box}>
                            {incident.npc_ids
                                .map((id) => npc_map.get(id)!)
                                .filter((v) => !!v)
                                .map((npc) => (
                                    <ActionButton key={npc.id}>{npc.base.name}</ActionButton>
                                ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    )
}
