// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import ThemeLabel from '@/component/theme-label'
import { DefaultButton, TextField } from 'office-ui-fabric-react'
import { BehaviorSubject, timer, of } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import { debounceTime, skip, switchMap, filter, map } from 'rxjs/operators'
import IconButton from '@/component/icon-button'
import {
    table_system_li$,
    find_table_li_auto,
    table_system_edit$,
    save_table_edited,
    table_system_use_id$,
    of_table_system,
    edit_table_system_use,
    table_type_use_id$,
    table_system_use$,
    table_type_use$,
    of_table_type,
    table_type_li$,
    get_cur_table_edit,
    table_cell_li$,
    table_cell_use_id$,
    of_table_cell,
    table_cell_use$,
    save_table_li,
} from '@/source/table'
import { search_text$ } from '@/subject/search'
import { next_router } from '@/function/router'

interface cell {
    id: string
    level: number
    name: string
    description: string
}

export default function Edit() {
    useEffect(() => {
        // 读写文件
        const obread = timer(50).subscribe(() => {
            find_table_li_auto()
        })
        const obsave = table_system_edit$.pipe(skip(1), debounceTime(2000)).subscribe(() => {
            save_table_edited()
        })
        return () => {
            obread.unsubscribe()
            obsave.unsubscribe()
        }
    }, [])
    return (
        <div className={s.Edit}>
            <Systems />
            <Types />
            <Cells />
            <Preview />
        </div>
    )
}

/** 体系 */
function Systems() {
    const systems = useObservable(() => table_system_li$.pipe(shallowCopy()), [])
    const sid = useObservable(() => table_system_use_id$, '')
    const [can_show_input, set_can_show_input] = useState(false)
    const [ipt, set_ipt] = useState('')
    const edit = useObservable(() => table_system_edit$, of_table_system())
    useEffect(() => {
        // 尝试自动聚焦第一个
        const ob = table_system_li$.pipe(filter((li) => !!li.length)).subscribe((li) => {
            if (!table_system_use_id$.value) {
                table_system_use_id$.next(li[0].id)
                edit_table_system_use()
            }
        })
        return () => ob.unsubscribe()
    }, [])
    return (
        <section className={s.Systems}>
            <header className={s.header}>系统</header>
            <div className={s.btnbox}>
                <IconButton
                    icon="Add"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        table_system_use_id$.next('')
                        edit_table_system_use()
                        set_can_show_input(true)
                    }}
                ></IconButton>
                <IconButton
                    icon="Edit"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        edit_table_system_use()
                        set_ipt(edit.name)
                        set_can_show_input(true)
                    }}
                ></IconButton>
                <IconButton
                    icon="Delete"
                    add_class={[s.iconbtn]}
                    onDoubleClick={() => {
                        const nli = systems.filter((v) => v.id !== sid)
                        save_table_li(nli)
                        find_table_li_auto()
                    }}
                ></IconButton>
            </div>
            <div className={s.labelbox}>
                {systems.map((sys) => (
                    <ThemeLabel
                        key={sys.id}
                        add_class={[s.one, sys.id === sid ? s.hold : '']}
                        onClick={() => {
                            table_system_use_id$.next(sys.id)
                            edit_table_system_use()
                        }}
                    >
                        {sys.name}{' '}
                    </ThemeLabel>
                ))}
            </div>
            {can_show_input && (
                <div className={s.iptbox}>
                    <TextField
                        label="系统名称"
                        className={s.ipt}
                        value={ipt}
                        onChange={(_, ns) => {
                            const str = ns || ''
                            set_ipt(str)
                        }}
                    ></TextField>
                    <DefaultButton
                        disabled={!ipt.trim()}
                        onClick={() => {
                            const iptuse = ipt.trim()
                            edit.name = iptuse
                            save_table_edited()
                            set_can_show_input(false)
                            set_ipt('')
                            find_table_li_auto()
                        }}
                    >
                        好
                    </DefaultButton>
                </div>
            )}
        </section>
    )
}

/** 种类 */
function Types() {
    const types = useObservable(() => table_type_li$, [])
    const sid = useObservable(() => table_system_use_id$, '')
    const tid = useObservable(() => table_type_use_id$, '')
    const [can_show_input, set_can_show_input] = useState(false)
    const [ipt, set_ipt] = useState('')
    const iptuse = ipt.trim()
    const [how_edit, next_how_edit] = useState<'add' | 'edit'>('add')
    function reset() {
        set_ipt('')
        set_can_show_input(false)
    }
    useEffect(() => {
        reset()
    }, [types])
    useEffect(() => {
        const ob = table_system_use$.pipe().subscribe((v) => {
            const ts = v?.types ?? []
            const id = ts[0]?.id ?? ''
            const old_type_id = table_type_use_id$.value

            if (ts.length && !ts.find((v) => v.id === old_type_id)) {
                table_type_use_id$.next(id)
            }
        })
        return () => ob.unsubscribe()
    }, [])
    return (
        <section className={s.Types}>
            <header className={s.header}>类别</header>
            <div className={s.btnbox}>
                <IconButton
                    icon="Add"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        next_how_edit('add')
                        set_can_show_input(true)
                    }}
                ></IconButton>
                <IconButton
                    icon="Edit"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        next_how_edit('edit')
                        const es = get_cur_table_edit()
                        set_ipt(es.type?.name ?? '')
                        set_can_show_input(true)
                    }}
                ></IconButton>

                <IconButton
                    icon="Delete"
                    add_class={[s.iconbtn]}
                    onDoubleClick={() => {
                        const es = get_cur_table_edit()
                        es.system.types = types.filter((v) => v.id !== tid)
                        save_table_edited()
                        find_table_li_auto()
                    }}
                ></IconButton>
            </div>
            <div className={s.labelbox}>
                {types.map((type) => (
                    <ThemeLabel
                        key={type.id}
                        add_class={[s.one, type.id === tid ? s.hold : '']}
                        onClick={() => {
                            table_type_use_id$.next(type.id)
                        }}
                    >
                        {type.name}
                    </ThemeLabel>
                ))}
            </div>
            {can_show_input && sid && (
                <div className={s.iptbox}>
                    <TextField
                        label="种类名称"
                        className={s.ipt}
                        value={ipt}
                        onChange={(_, ns) => {
                            const str = ns || ''
                            set_ipt(str)
                        }}
                    ></TextField>
                    <DefaultButton
                        disabled={!iptuse}
                        onClick={() => {
                            const es = get_cur_table_edit()
                            if (how_edit === 'add') {
                                const a = of_table_type()
                                a.name = iptuse
                                es.system.types.push(a)
                            } else {
                                es.type!.name = iptuse
                            }
                            save_table_edited()
                            set_can_show_input(false)
                            set_ipt('')
                            find_table_li_auto()
                        }}
                    >
                        好
                    </DefaultButton>
                </div>
            )}
        </section>
    )
}

/** 一项 */
function Cells() {
    const cid = useObservable(() => table_cell_use_id$, '')
    const cells = useObservable(() => table_cell_li$, [])
    const [can_show_input, set_can_show_input] = useState(false)
    const [how_edit, next_how_edit] = useState<'add' | 'edit'>('add')
    const [ipt_level, set_ipt_level] = useState(0)
    const [ipt_name, set_ipt_name] = useState('')
    const ipt_name_use = ipt_name.trim()
    // 描述
    const [ipt_des, set_ipt_des] = useState('')
    function reset() {
        set_ipt_des('')
        set_ipt_level(0)
        set_ipt_name('')
    }
    useEffect(() => {
        const ob = table_type_use$.subscribe((v) => {
            if (!table_cell_use_id$.value) {
                table_cell_use_id$.next((v?.cells ?? [])[0]?.id ?? '')
            }
        })
        return () => ob.unsubscribe()
    }, [])
    useEffect(() => {
        const ob = table_cell_use$.pipe().subscribe((v) => {
            set_ipt_des(v?.description ?? '')
            set_ipt_level(v?.level ?? 0)
            set_ipt_name(v?.name ?? '')
        })
        return () => ob.unsubscribe()
    }, [])

    return (
        <section className={s.Cells}>
            <header className={s.header}>项</header>
            <div className={s.btnbox}>
                <IconButton
                    icon="Add"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        reset()
                        next_how_edit('add')
                        set_can_show_input(true)
                    }}
                ></IconButton>

                <IconButton
                    icon="Edit"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        const cell = cells.find((v) => v.id === cid)
                        if (cell) {
                            next_how_edit('edit')
                            const es = get_cur_table_edit()
                            set_ipt_level(es.cell?.level ?? 0)
                            set_ipt_name(es.cell?.name ?? '')
                            set_ipt_des(es.cell?.description ?? '')
                            set_can_show_input(true)
                        }
                    }}
                ></IconButton>

                <IconButton
                    icon="Delete"
                    add_class={[s.iconbtn]}
                    onDoubleClick={() => {
                        const es = get_cur_table_edit()
                        if (!es.type) {
                            return
                        }
                        es.type.cells = cells.filter((v) => v.id !== cid)
                        save_table_edited()
                        find_table_li_auto()
                        set_can_show_input(false)
                    }}
                ></IconButton>
            </div>
            <div className={s.labelbox}>
                {cells.map((cell) => (
                    <ThemeLabel
                        key={cell.level}
                        add_class={[s.one, cell.id === cid ? s.hold : '']}
                        onClick={() => {
                            table_cell_use_id$.next(cell.id)
                        }}
                    >
                        {cell.level} - {cell.name}
                    </ThemeLabel>
                ))}
            </div>
            {can_show_input && (
                <div className={s.iptbox}>
                    <TextField
                        label="级别"
                        className={s.ipt}
                        value={ipt_level + ''}
                        onChange={(_, ns) => {
                            const str = (ns || '').replace(/[^0-9]/g, '')
                            set_ipt_level(Number(str))
                        }}
                    ></TextField>
                    <TextField
                        label="名称"
                        className={s.ipt}
                        value={ipt_name}
                        onChange={(_, ns) => {
                            const str = ns || ''
                            set_ipt_name(str)
                        }}
                    ></TextField>
                    <TextField
                        label="描述"
                        className={s.ipt2}
                        value={ipt_des}
                        onChange={(_, ns) => {
                            const str = (ns || '').replace(/\n+/g, '\n')
                            set_ipt_des(str)
                        }}
                        multiline
                        resizable={false}
                        autoAdjustHeight={true}
                    ></TextField>
                    <DefaultButton
                        disabled={!ipt_name_use}
                        onClick={() => {
                            const es = get_cur_table_edit()
                            const type = es.type
                            if (!type) {
                                alert('先选择系统和类别')
                                return
                            }
                            if (how_edit === 'add') {
                                const a = of_table_cell()
                                a.name = ipt_name_use
                                a.level = ipt_level
                                a.description = ipt_des
                                if (type.cells.find((v) => v.level === ipt_level)) {
                                    alert('本类别已经有此等级了')
                                    return
                                }
                                type.cells.push(a)
                            } else {
                                const ce = es.cell!
                                if (type.cells.find((v) => v.level === ipt_level && v.id !== ce.id)) {
                                    alert('本类别已经有此等级了')
                                    return
                                }
                                ce.name = ipt_name_use
                                ce.description = ipt_des
                                ce.level = ipt_level
                            }
                            es.type?.cells.sort((a, b) => b.level - a.level)

                            reset()
                            save_table_edited()
                            find_table_li_auto()
                            set_can_show_input(false)
                        }}
                    >
                        好
                    </DefaultButton>
                </div>
            )}
        </section>
    )
}

/** 预览 */
function Preview() {
    const cid = useObservable(() => table_cell_use_id$, '')
    const types = useObservable(() => table_system_use$.pipe(map((v) => v?.types ?? [])), [])
    const arr: (cell | undefined | number)[][] = []
    types.forEach((tp, x) => {
        const cells = tp.cells
        cells.forEach((cell) => {
            const fi = arr.find((v) => v[0] === cell.level)
            if (fi) {
                fi[x + 1] = cell
            } else {
                const new_line: any[] = Array.from({ length: types.length + 1 }, () => undefined)
                new_line[0] = cell.level
                new_line[x + 1] = cell
                arr.push(new_line)
            }
        })
    })
    arr.sort((a, b) => {
        return (b as any)[0] - (a as any)[0]
    })
    const head_line = ['等级\\类别', ...types.map((v) => v.name)]

    return (
        <section className={s.Preview}>
            <header className={s.header}>预览</header>
            <table className={s.table}>
                <thead>
                    <tr>
                        {head_line.map((v) => (
                            <td className={s.td} key={v}>
                                {v}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {arr.map((line, y) => (
                        <tr key={y}>
                            {line.map((cell, x) =>
                                typeof cell === 'number' ? (
                                    <td className={s.td} key={`${y}-${x}`}>
                                        {cell}
                                    </td>
                                ) : (
                                    <td
                                        className={[
                                            s.td,
                                            cell?.id === cid ? s.hold : '',
                                            cell?.name ? s.canclick : '',
                                        ].join(' ')}
                                        key={`${y}-${x}`}
                                        onClick={() => {
                                            if (cell?.id) {
                                                table_cell_use_id$.next(cell.id)
                                                const tid = types[x - 1].id
                                                table_type_use_id$.next(tid)
                                            }
                                        }}
                                        onDoubleClick={() => {
                                            navigator.clipboard.writeText(cell?.name || '')
                                            search_text$.next(cell?.name || '')
                                            next_router('search')
                                        }}
                                    >
                                        {cell?.name}
                                    </td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
