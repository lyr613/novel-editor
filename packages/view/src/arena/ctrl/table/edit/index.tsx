// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import ThemeLabel from '@/component/theme-label'
import ThemeButton from '@/component/theme-button'
import { DefaultButton, TextField } from 'office-ui-fabric-react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { mk_uuid } from '@/function/id32'
import { shallowCopy } from '@/rx/shallow-copy'
import { debounceTime, skip } from 'rxjs/operators'
import IconButton from '@/component/icon-button'
import { table_list$ } from '@/source/table'
import { search_text$ } from '@/subject/search'
import { next_router } from '@/function/router'
import { get_cur_book_src } from '@/source/book'
import { fs_read, fs_write } from '@/source/fs-common'

interface cell {
    id: string
    level: number
    name: string
    description: string
}
interface atype {
    id: string
    name: string
    cells: cell[]
}
interface system {
    id: string
    name: string
    types: atype[]
}

const system_list$ = table_list$
const sys_id$ = new BehaviorSubject('')
const type_id$ = new BehaviorSubject('')
const cell_id$ = new BehaviorSubject('')

export default function Edit() {
    useEffect(() => {
        // 读写文件
        system_list$.next([])
        if (!get_cur_book_src()) {
            return
        }
        const txt = fs_read<null | system[]>('json', [get_cur_book_src(), 'data-settings.json'])
        if (txt) {
            system_list$.next(txt)
        }
        const ob = system_list$.pipe(debounceTime(2000), skip(1)).subscribe((li) => {
            fs_write('json', [get_cur_book_src(), 'data-settings.json'], li)
        })
        return () => ob.unsubscribe()
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
    const systems = useObservable(() => system_list$.pipe(shallowCopy()), [])
    const sid = useObservable(() => sys_id$, '')
    const [can_show_input, set_can_show_input] = useState(false)
    const [ipt, set_ipt] = useState('')
    useEffect(() => {
        // 尝试自动聚焦第一个
        setTimeout(() => {
            const systems = system_list$.value
            if (systems.length) {
                const id = systems[0].id
                sys_id$.next(id)
            }
        }, 100)
    }, [])
    return (
        <section className={s.Systems}>
            <header className={s.header}>系统</header>
            <div className={s.btnbox}>
                <IconButton
                    icon="Add"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        sys_id$.next('')
                        set_can_show_input(true)
                    }}
                ></IconButton>
                <IconButton
                    icon="Edit"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        set_can_show_input(true)
                    }}
                ></IconButton>
                <IconButton
                    icon="Delete"
                    add_class={[s.iconbtn]}
                    onDoubleClick={() => {
                        const new_syss = systems.filter((v) => v.id !== sid)
                        system_list$.next(new_syss)
                        sys_id$.next('')
                    }}
                ></IconButton>
            </div>
            <div className={s.labelbox}>
                {systems.map((sys) => (
                    <ThemeLabel
                        key={sys.id}
                        add_class={[s.one, sys.id === sid ? s.hold : '']}
                        onClick={() => {
                            sys_id$.next(sys.id)
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
                            const fi = systems.find((v) => v.id === sid)
                            if (fi) {
                                fi.name = iptuse
                            } else {
                                const new_sys: system = {
                                    id: mk_uuid(),
                                    name: iptuse,
                                    types: [],
                                }
                                systems.push(new_sys)
                            }
                            system_list$.next(systems)
                            set_can_show_input(false)
                            set_ipt('')
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
    const systems = useObservable(() => system_list$.pipe(shallowCopy()), [])
    const sid = useObservable(() => sys_id$, '')
    const types = systems.find((v) => v.id === sid)?.types ?? []
    const tid = useObservable(() => type_id$, '')
    const [can_show_input, set_can_show_input] = useState(false)
    const [ipt, set_ipt] = useState('')
    const iptuse = ipt.trim()
    function reset() {
        set_ipt('')
        set_can_show_input(false)
    }
    useEffect(() => {
        reset()
    }, [types])
    return (
        <section className={s.Types}>
            <header className={s.header}>类别</header>
            <div className={s.btnbox}>
                <IconButton
                    icon="Add"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        type_id$.next('')
                        set_can_show_input(true)
                    }}
                ></IconButton>
                <IconButton
                    icon="Edit"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        set_can_show_input(true)
                    }}
                ></IconButton>

                <IconButton
                    icon="Delete"
                    add_class={[s.iconbtn]}
                    onDoubleClick={() => {
                        const fi = types.findIndex((v) => v.id === tid)
                        if (fi !== -1) {
                            types.splice(fi, 1)
                        }
                        system_list$.next(systems)
                    }}
                ></IconButton>
            </div>
            <div className={s.labelbox}>
                {types.map((type) => (
                    <ThemeLabel
                        key={type.id}
                        add_class={[s.one, type.id === tid ? s.hold : '']}
                        onClick={() => {
                            type_id$.next(type.id)
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
                            const fisys = systems.find((v) => v.id === sid)
                            if (!fisys) {
                                alert('先选择一个大系统')
                                return
                            }
                            const fi = types.find((v) => v.id === tid)
                            if (!fi) {
                                const opt: atype = {
                                    id: mk_uuid(),
                                    name: iptuse,
                                    cells: [],
                                }
                                types.push(opt)
                            } else {
                                fi.name = iptuse
                            }
                            system_list$.next(systems)
                            set_can_show_input(false)
                            set_ipt('')
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
    const systems = useObservable(() => system_list$.pipe(shallowCopy()), [])
    const sid = useObservable(() => sys_id$, '')
    const types = systems.find((v) => v.id === sid)?.types ?? []
    const tid = useObservable(() => type_id$, '')
    const cells = types.find((v) => v.id === tid)?.cells ?? []
    const cid = useObservable(() => cell_id$, '')
    const [can_show_input, set_can_show_input] = useState(false)
    const [ipt_level, set_ipt_level] = useState(0)
    const [ipt_name, set_ipt_name] = useState('')
    const ipt_name_use = ipt_name.trim()
    // 描述
    const [ipt_des, set_ipt_des] = useState('')
    function reset() {
        set_ipt_des('')
        set_ipt_level(0)
        set_ipt_name('')
        set_can_show_input(false)
    }
    useEffect(() => {
        reset()
    }, [types, cells])
    return (
        <section className={s.Cells}>
            <header className={s.header}>项</header>
            <div className={s.btnbox}>
                <IconButton
                    icon="Add"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        cell_id$.next('')
                        set_ipt_level(0)
                        set_ipt_name('')
                        set_can_show_input(true)
                    }}
                ></IconButton>

                <IconButton
                    icon="Edit"
                    add_class={[s.iconbtn]}
                    onClick={() => {
                        const cell = cells.find((v) => v.id === cid)
                        if (cell) {
                            set_ipt_level(cell.level)
                            set_ipt_name(cell.name)
                            set_ipt_des(cell.description)
                            set_can_show_input(true)
                        }
                    }}
                ></IconButton>

                <IconButton
                    icon="Delete"
                    add_class={[s.iconbtn]}
                    onDoubleClick={() => {
                        const fi = cells.findIndex((v) => v.id === cid)
                        if (fi !== -1) {
                            cells.splice(fi, 1)
                        }
                        system_list$.next(systems)
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
                            cell_id$.next(cell.id)
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
                            const str = (ns || '').replace(/\s/g, '')
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
                            const fisys = systems.find((v) => v.id === sid)
                            const fits = types.find((v) => v.id === tid)
                            if (!fisys || !fits) {
                                alert('先选择系统和类别')
                                return
                            }
                            const fi = cells.find((v) => v.id === cid)
                            if (!fi) {
                                const opt: cell = {
                                    id: mk_uuid(),
                                    name: ipt_name_use,
                                    level: ipt_level,
                                    description: ipt_des,
                                }
                                if (cells.find((v) => v.level === ipt_level)) {
                                    alert('本类别已经有此级别了')
                                    return
                                }
                                fits.cells.push(opt)
                            } else {
                                fi.level = ipt_level
                                fi.name = ipt_name_use
                                fi.description = ipt_des
                            }
                            fits.cells.sort((a, b) => b.level - a.level)

                            system_list$.next(systems)
                            set_can_show_input(false)
                            set_ipt_level(0)
                            set_ipt_name('')
                            set_ipt_des('')
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
    const systems = useObservable(() => system_list$.pipe(shallowCopy()), [])
    const sid = useObservable(() => sys_id$, '')
    const cid = useObservable(() => cell_id$, '')
    const types = systems.find((v) => v.id === sid)?.types ?? []
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
    const head_line = ['级别', ...types.map((v) => v.name)]

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
                                                cell_id$.next(cell.id)
                                                const tid = types[x - 1].id
                                                type_id$.next(tid)
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
