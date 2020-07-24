// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { npc_li$, node_use$, npc_use_id$, npc_use$, npc_li_save, find_npc_li_auto } from '@/source'
import { date_decode, format_date } from '@/util'
import { fromEvent } from 'rxjs'
import { Screen$ } from '@/subscribe'
import { Icon } from 'office-ui-fabric-react'
import { next_router } from '@/function/router'
import { shallowCopy } from '@/rx/shallow-copy'
import { filterd_list$ } from '../subj'
import { show_format } from '@/function/text'

export default function List() {
    // 一个npc的宽度
    const [one_w, set_one_w] = useState(0)
    /** npc列表 */
    const list = useObservable(() => filterd_list$, [])
    const use = useObservable(() => npc_use$)
    const refbox = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        const dom = refbox.current
        if (!dom) {
            return
        }
        // 计算一个npc的宽度
        const ob_w = Screen$.subscribe(() => {
            const W = dom.clientWidth - 10
            let w = W
            let i = 1
            while (w > 240) {
                w = W / i
                i++
            }
            w = (W / Math.max(1, i - 2)) | 0
            set_one_w(w - 10)
        })
        // 滚动
        const ob_wheel = fromEvent(dom, 'mousewheel').subscribe((e: any) => {
            const w = e.wheelDelta
            const s = dom.scrollTop
            dom.scrollTo(0, s - w)
        })
        return () => {
            ob_wheel.unsubscribe()
            ob_w.unsubscribe()
        }
    }, [])
    return (
        <div className={s.List} ref={refbox}>
            {list.map((npc) => (
                <div
                    className={s.one}
                    key={npc.id}
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        npc_use_id$.next(npc.id)
                    }}
                    style={{
                        width: one_w + 'px',
                    }}
                >
                    <div className={[s.name, use?.id === npc.id ? s.name2 : ''].join(' ')} style={{}}>
                        <span>
                            {npc.base.name} {gender_map(npc.base.gender)}
                        </span>
                        <Icon
                            iconName="Settings"
                            className={s.icon}
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                npc_use_id$.next(npc.id)
                                next_router('npc', 'edit')
                            }}
                            styles={{
                                root: {
                                    marginLeft: 'auto',
                                },
                            }}
                        ></Icon>
                        <Icon
                            iconName="Delete"
                            className={s.icon}
                            onDoubleClick={() => {
                                const li = npc_li$.value.filter((v) => v.id !== npc.id)
                                npc_li_save(li)
                                find_npc_li_auto()
                            }}
                        ></Icon>
                    </div>
                    {/* <div className={s.line}>
						活跃时间: {format_date(npc.base.active.slice(0, 3))} {' ~ '}
						{format_date(npc.base.active.slice(3, 7))}
					</div> */}
                    <div className={s.line}>{show_format(npc.base.description)}</div>
                </div>
            ))}
        </div>
    )
}

function gender_map(s: string) {
    if (s === '1') {
        return '♂'
    }
    if (s === '0') {
        return '♀'
    }
    return '?'
}
