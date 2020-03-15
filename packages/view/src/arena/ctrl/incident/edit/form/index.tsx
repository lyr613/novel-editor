// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField, PrimaryButton, Icon } from 'office-ui-fabric-react'
import DateYMD from '@/component/date'
import { useObservable } from 'rxjs-hooks'
import { incident_focu$, incident_edit$, incident_edit_re$, incident_list$ } from '@/source/incident'
import NpcSelect from '@/component/npc'
import { next_router } from '@/function/router'
import ThemeButton from '@/component/theme-button'
import SectionHeader from '@/component/section-header'
import ThemeLabel from '@/component/theme-label'
import { shallowCopy } from '@/rx/shallow-copy'
import IconButton from '@/component/icon-button'
import { chapter_list$, fs_write, book_focu$, focu_node_then_edit } from '@/source'

export default function Form() {
    useEffect(() => {
        // 提交结果
        const sub_re = incident_edit_re$.subscribe((b) => {
            if (b) {
                next_router('incident')
            } else {
                alert('提交失败')
            }
        })
        return () => sub_re.unsubscribe()
    }, [])
    return (
        <>
            <Text />
            <Links />
            <Npcs />
            <DateSE />
            <Confirm />
        </>
    )
}

/** 标题和描述 */
function Text() {
    const incident = useObservable(() => incident_focu$.pipe(shallowCopy()))

    if (!incident) {
        return null
    }
    return (
        <section className={s.Text}>
            <SectionHeader>基本信息</SectionHeader>
            <div
                style={{
                    margin: '0 10px',
                }}
            >
                <TextField
                    label="名称"
                    value={incident.label}
                    onChange={(_, ss) => {
                        incident.label = ss || ''
                        incident_focu$.next(incident)
                    }}
                    required
                    autoComplete="off"
                ></TextField>
                <TextField
                    label="描述"
                    value={incident.text}
                    onChange={(_, ss) => {
                        incident.text = ss || ''
                        incident_focu$.next(incident)
                    }}
                    required
                    multiline
                    autoAdjustHeight
                    resizable={false}
                    styles={{
                        root: {
                            margin: '10px 0',
                        },
                    }}
                ></TextField>
                <TextField
                    label="字数预期"
                    value={incident.word.preset + ''}
                    onChange={(_, ns) => {
                        ns = (ns || '').replace(/[^0-9]/g, '')
                        incident.word.preset = Number(ns)
                        incident_focu$.next(incident)
                    }}
                ></TextField>
            </div>
        </section>
    )
}

/** 线索 */
function Links() {
    // 显示输入框
    const [can_show_ipt, set_can_show_ipt] = useState(false)
    // 输入名字以搜索节
    const [ipt_name, set_ipt_name] = useState('')
    // 正在设置开始章节
    const [be_start, set_be_start] = useState(true)
    const incident = useObservable(() => incident_focu$.pipe(shallowCopy()))

    if (!incident) {
        return null
    }
    const nodes = get_now_node_list()
    const node_show = nodes.filter((v) => v.name.match(ipt_name || '\\n')).slice(0, 10)
    const start_name = _get_node_name(nodes, incident.link_line.start_node_id)
    const end_name = _get_node_name(nodes, incident.link_line.end_node_id)
    /** 线索下标 */
    const link_nums = Array.from({ length: 9 }, (_, i) => i)
    return (
        <section className={s.Links}>
            <SectionHeader>线索</SectionHeader>
            <div className={s.aline}>
                <span className={s.name}>所属线索: </span>
                {link_nums.map((n) => (
                    <ThemeLabel
                        key={n}
                        onClick={() => {
                            incident.link_line.index = n
                            incident_focu$.next(incident)
                        }}
                        add_class={[s.event_line, incident.link_line.index === n ? s.hold : '']}
                    >
                        {_link_name_map(n)}
                    </ThemeLabel>
                ))}
            </div>
            <div className={s.aline}>
                <span className={s.name}>开始章节: </span>
                <ThemeLabel
                    onClick={() => {
                        const id = incident.link_line.start_node_id
                        focu_node_then_edit(id)
                    }}
                    add_class={[s.can_click]}
                >
                    {start_name}
                </ThemeLabel>
                <IconButton
                    icon="Settings"
                    add_class={[s.icon]}
                    onClick={() => {
                        set_be_start(true)
                        set_can_show_ipt(true)
                    }}
                ></IconButton>
            </div>
            <div className={s.aline}>
                <span className={s.name}>结束章节: </span>
                <ThemeLabel
                    onClick={() => {
                        const id = incident.link_line.end_node_id
                        focu_node_then_edit(id)
                    }}
                    add_class={[s.can_click]}
                >
                    {end_name}
                </ThemeLabel>
                <IconButton
                    icon="Settings"
                    add_class={[s.icon]}
                    onClick={() => {
                        set_be_start(false)
                        set_can_show_ipt(true)
                    }}
                ></IconButton>
            </div>
            {can_show_ipt && (
                <div className={s.aline}>
                    <span className={s.name}>搜索章节以设定: </span>
                    <TextField
                        value={ipt_name}
                        onChange={(_, ns) => {
                            ns = (ns || '').trim()
                            set_ipt_name(ns)
                        }}
                    ></TextField>
                    {node_show.map((nd) => (
                        <ThemeLabel
                            key={nd.id}
                            add_class={[s.wait_set]}
                            onClick={() => {
                                if (be_start) {
                                    incident.link_line.start_node_id = nd.id
                                } else {
                                    incident.link_line.end_node_id = nd.id
                                }
                                incident_focu$.next(incident)
                                set_can_show_ipt(false)
                                set_ipt_name('')
                            }}
                        >
                            {nd.name}
                        </ThemeLabel>
                    ))}
                </div>
            )}
        </section>
    )
}

/** 获取当前的节列表 */
function get_now_node_list() {
    const cps = chapter_list$.value
    const re: node[] = []
    cps.forEach((cp) => {
        cp.children.forEach((nd) => {
            re.push(nd)
        })
    })
    return re
}
function _get_node_name(nodes: node[], id: string) {
    if (!id) {
        return ''
    }
    const fi = nodes.find((v) => v.id === id)
    return fi?.name || ''
}

function _link_name_map(n: number) {
    if (n === 0) {
        return '独立事件'
    }
    return '线索' + n
}
/** 相关角色 */
function Npcs() {
    const incident = useObservable(() => incident_focu$.pipe(shallowCopy()))
    if (!incident) {
        return null
    }
    return (
        <section className={s.Npcs}>
            <SectionHeader>相关角色</SectionHeader>
            <div className={s.npcbox}>
                <NpcSelect
                    label=""
                    did_ids={incident.npc_ids}
                    on_reduce={(npc) => {
                        incident.npc_ids = incident.npc_ids.filter((id) => id !== npc.id)
                        incident_focu$.next(incident)
                    }}
                    on_plus={(npc) => {
                        incident.npc_ids.push(npc.id)
                        incident_focu$.next(incident)
                    }}
                ></NpcSelect>
            </div>
        </section>
    )
}

/** 日期 */
function DateSE() {
    const incident = useObservable(() => incident_focu$.pipe(shallowCopy()))
    if (!incident) {
        return null
    }
    return (
        <section className={s.DateSE}>
            <SectionHeader>起止日期</SectionHeader>
            <div className={s.life}>
                <DateYMD
                    label="开始"
                    value1={incident.life[0]}
                    value2={incident.life[1]}
                    value3={incident.life[2]}
                    onChange1={(str) => {
                        incident.life[0] = str
                        incident_focu$.next(incident)
                    }}
                    onChange2={(str) => {
                        incident.life[1] = str
                        incident_focu$.next(incident)
                    }}
                    onChange3={(str) => {
                        incident.life[2] = str
                        incident_focu$.next(incident)
                    }}
                ></DateYMD>
                <span className={s.split}>-</span>
                <DateYMD
                    label="结束"
                    value1={incident.life[3]}
                    value2={incident.life[4]}
                    value3={incident.life[5]}
                    onChange1={(str) => {
                        incident.life[3] = str
                        incident_focu$.next(incident)
                    }}
                    onChange2={(str) => {
                        incident.life[4] = str
                        incident_focu$.next(incident)
                    }}
                    onChange3={(str) => {
                        incident.life[5] = str
                        incident_focu$.next(incident)
                    }}
                ></DateYMD>
            </div>
        </section>
    )
}

function Confirm() {
    return (
        <div className={s.Confirm}>
            <ThemeButton
                onClick={() => {
                    incident_edit$.next()
                    const ins = incident_list$.value
                    const nin = incident_focu$.value
                    const book = book_focu$.value
                    if (!nin || !book) {
                        alert('意外的丢失了本次编辑信息, 重载app试试')
                        return
                    }
                    const fi = ins.findIndex((v) => v.id === nin.id)
                    if (fi === -1) {
                        ins.push(nin)
                    } else {
                        ins[fi] = nin
                    }
                    incident_list$.next(ins)
                    fs_write('json', [book.src, 'incident.json'], ins)
                }}
            >
                好
            </ThemeButton>
        </div>
    )
}
