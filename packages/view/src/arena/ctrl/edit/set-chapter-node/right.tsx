// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { chapter_li$, save_chapter_li, find_chapter_li_auto } from '@/source/chapter-node'
import { IDropdownOption, Dropdown, IChoiceGroupOption, ChoiceGroup, DefaultButton } from 'office-ui-fabric-react'
import { url } from 'inspector'
import { Subject } from 'rxjs'
import { debounceTime, filter, switchMap, map, take, tap } from 'rxjs/operators'
import { sel_id_map$, sel_node1$, sel_node2$ } from './subj'
import { editing_chapter$ } from '../subj'
import QvButton from '@/component/ui/button'

export default function Right() {
    return (
        <div className={s.Right}>
            <div className={s.help}>在列表选择一些章节, 然后在这里选择操作</div>
            <Move />
            <Del />
            <Esc />
        </div>
    )
}

/** [章id, 位置] */
const ms$ = new Subject<string[]>()

function Move() {
    const [sel_cp, next_sel_cp] = useState('')
    const [sel_pos, next_sel_pos] = useState('head')
    const cps = useObservable(() => chapter_li$, [])
    const seld = useObservable(() => sel_node1$)
    /** 所在章下拉列表 */
    const cp_sel_opt: IDropdownOption[] = cps.map((cp) => {
        return {
            key: cp.id,
            text: cp.name,
        }
    })
    const pos_opts: IChoiceGroupOption[] = [
        { key: 'head', text: '起始' },
        { key: 'last', text: '末尾' },
    ]
    useEffect(() => {
        const ob = ms$
            .pipe(
                debounceTime(200),
                filter((e) => !!e[0] && !!e[1]),
                switchMap((ss) =>
                    chapter_li$.pipe(
                        take(1),
                        switchMap((cps) =>
                            sel_id_map$.pipe(
                                take(1),
                                tap((smp) => {
                                    const li: node[] = []
                                    cps.forEach((cp) => {
                                        cp.children.forEach((nd) => {
                                            if (smp.get(nd.id) === true) {
                                                li.push({ ...nd })
                                                nd.will_delete = true
                                            }
                                        })
                                        cp.children = cp.children.filter((v) => !v.will_delete)
                                    })
                                    const fcp = cps.find((v) => v.id === ss[0])
                                    if (!fcp) {
                                        return
                                    }
                                    li.forEach((nd) => {
                                        nd.chapter_id = ss[0]
                                    })
                                    if (ss[1] === 'head') {
                                        fcp.children.unshift(...li)
                                    } else {
                                        fcp.children.push(...li)
                                    }
                                }),
                            ),
                        ),
                    ),
                ),
            )
            .subscribe(() => {
                save_chapter_li()
                find_chapter_li_auto()
                sel_node1$.next(null)
                sel_node2$.next(null)
            })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={s.Move}>
            <Dropdown
                options={cp_sel_opt}
                label="要移动到的章"
                placeHolder="..."
                selectedKey={sel_cp}
                onChange={(_, opt) => {
                    const id = (opt?.key ?? '') as string
                    next_sel_cp(id)
                }}
            ></Dropdown>
            <ChoiceGroup
                label="位置"
                selectedKey={sel_pos}
                onChange={(_, opt) => {
                    const v = (opt?.key ?? '') as string
                    next_sel_pos(v)
                }}
                options={pos_opts}
                styles={{
                    flexContainer: {
                        display: 'flex',
                        selectors: {
                            '& .ms-ChoiceField': {
                                marginRight: '10px',
                            },
                        },
                    },
                    label: {
                        marginTop: '10px',
                    },
                }}
            ></ChoiceGroup>
            <div className={s.split}></div>
            <QvButton
                withTheme
                onClick={() => {
                    ms$.next([sel_cp, sel_pos])
                }}
                disabled={!seld || !sel_cp}
            >
                移动
            </QvButton>
        </div>
    )
}

function Del() {
    const seld = useObservable(() => sel_node1$)

    return (
        <div className={s.Del}>
            <DefaultButton
                disabled={!seld}
                onDoubleClick={() => {
                    chapter_li$
                        .pipe(
                            take(1),
                            switchMap((cps) =>
                                sel_id_map$.pipe(
                                    take(1),
                                    tap((smp) => {
                                        cps.forEach((cp) => {
                                            cp.children = cp.children.filter((v) => !smp.get(v.id))
                                        })
                                    }),
                                ),
                            ),
                        )
                        .subscribe(() => {
                            save_chapter_li()
                            find_chapter_li_auto()
                            sel_node1$.next(null)
                            sel_node2$.next(null)
                        })
                }}
            >
                删除
            </DefaultButton>
        </div>
    )
}

function Esc() {
    return (
        <div className={s.Esc}>
            <div className={s.split}></div>
            <DefaultButton onClick={() => editing_chapter$.next(false)}>退出编辑</DefaultButton>
        </div>
    )
}
