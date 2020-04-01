// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import {
    TextField,
    MaskedTextField,
    PrimaryButton,
    Dropdown,
    Label,
    Icon,
    Dialog,
    DialogType,
    DialogFooter,
    DefaultButton,
} from 'office-ui-fabric-react'
import { sty_text } from './office-style'
import { useObservable } from 'rxjs-hooks'
import { map } from 'rxjs/operators'
import { book_use$, npc_li$, npc_map$, fs_write, npc_edit$, npc_edited_save } from '@/source'
import { electron } from '@/const'
import { next_router } from '@/function/router'
import DateYMD from '@/component/date'
import ThemeButton from '@/component/theme-button'
import { shallowCopy } from '@/rx/shallow-copy'
import ThemeLabel from '@/component/theme-label'
import { get_ran_name } from './util-name'
import IconButton from '@/component/icon-button'

export default function NpcForm() {
    return (
        <div className={s.Form}>
            <Base />
            <Uneed />
            <Confirm />
        </div>
    )
}

function Base() {
    const npc = useObservable(() => npc_edit$.pipe(shallowCopy()))
    if (!npc) {
        return null
    }
    const { base } = npc
    return (
        <section className={[s.section, s.base].join(' ')}>
            <p className={s.label}>基本信息</p>
            <ul className={s.ctrl}>
                <li className={s.flexrow}>
                    <TextField
                        className={s.input}
                        label="姓名"
                        value={base.name}
                        required
                        onChange={(_, str) => {
                            const nstr = (str || '').trim()
                            base.name = nstr
                            npc_edit$.next(npc)
                        }}
                        autoComplete="off"
                    ></TextField>
                    <ThemeLabel
                        add_class={[s.namelabel]}
                        onClick={() => {
                            base.name = get_ran_name()
                            npc_edit$.next(npc)
                        }}
                    >
                        随机
                    </ThemeLabel>
                </li>
                <li className={s.flexrow}>
                    <Dropdown
                        className={s.input}
                        label="性别"
                        selectedKey={base.gender}
                        options={[
                            {
                                key: '0',
                                text: '女',
                            },
                            {
                                key: '1',
                                text: '男',
                            },
                            {
                                key: '2',
                                text: '其他',
                            },
                        ]}
                        onChange={(_, opt) => {
                            base.gender = (opt?.key ?? '0') as any
                            npc_edit$.next(npc)
                        }}
                    ></Dropdown>
                </li>
                {/* <li className={s.flexrow}>
					<DateYMD
						label="登场"
						value1={base.active[0]}
						value2={base.active[1]}
						value3={base.active[2]}
						onChange1={str => {
							base.active[0] = str
							npc_focu$.next(npc)
						}}
						onChange2={str => {
							base.active[1] = str
							npc_focu$.next(npc)
						}}
						onChange3={str => {
							base.active[2] = str
							npc_focu$.next(npc)
						}}
					></DateYMD>
					<span
						style={{
							lineHeight: '36px',
							fontSize: '16px',
							padding: '0 5px',
						}}
					>
						-
					</span>
					<DateYMD
						label="退场"
						value1={base.active[3]}
						value2={base.active[4]}
						value3={base.active[5]}
						onChange1={str => {
							base.active[3] = str
							npc_focu$.next(npc)
						}}
						onChange2={str => {
							base.active[4] = str
							npc_focu$.next(npc)
						}}
						onChange3={str => {
							base.active[5] = str
							npc_focu$.next(npc)
						}}
					></DateYMD>
				</li> */}
                <li className={s.row}>
                    <TextField
                        label="描述"
                        value={npc.base.description}
                        onChange={(_, ss) => {
                            npc.base.description = ss || ''
                            npc_edit$.next(npc)
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
                </li>
            </ul>
        </section>
    )
}

/**
 * 扩展信息
 * 出生死亡, 人际关系
 */
function Uneed() {
    const npc = useObservable(() => npc_edit$.pipe(shallowCopy()))
    const npc_li = useObservable(() => npc_li$.pipe(shallowCopy()))
    const npc_map = useObservable(() => npc_map$)
    const [can_show_link_dialog, set_can_show_link_dialog] = useState(false)
    const [form_link_id, set_form_link_id] = useState('')
    const [form_link_description, set_form_link_description] = useState('')
    useEffect(() => {
        console.log(npc)
    }, [npc])
    if (!npc || !npc_li || !npc_map) {
        return null
    }
    const { uneed } = npc
    function close_dialog() {
        set_can_show_link_dialog(false)
        set_form_link_description('')
        set_form_link_id('')
    }

    return (
        <section className={[s.section, s.uneed].join(' ')}>
            <p className={s.label}>扩展信息</p>
            <ul className={s.ctrl}>
                <li className={s.flexrow}>
                    <DateYMD
                        label="出生"
                        value1={uneed.life[0]}
                        value2={uneed.life[1]}
                        value3={uneed.life[2]}
                        onChange1={(str) => {
                            uneed.life[0] = str
                            npc_edit$.next(npc)
                        }}
                        onChange2={(str) => {
                            uneed.life[1] = str
                            npc_edit$.next(npc)
                        }}
                        onChange3={(str) => {
                            uneed.life[2] = str
                            npc_edit$.next(npc)
                        }}
                    ></DateYMD>
                    <span
                        style={{
                            lineHeight: '36px',
                            fontSize: '16px',
                            padding: '0 5px',
                        }}
                    >
                        -
                    </span>
                    <DateYMD
                        label="离世"
                        value1={uneed.life[3]}
                        value2={uneed.life[4]}
                        value3={uneed.life[5]}
                        onChange1={(str) => {
                            uneed.life[3] = str
                            npc_edit$.next(npc)
                        }}
                        onChange2={(str) => {
                            uneed.life[4] = str
                            npc_edit$.next(npc)
                        }}
                        onChange3={(str) => {
                            uneed.life[5] = str
                            npc_edit$.next(npc)
                        }}
                    ></DateYMD>
                </li>
                <li className={s.row}>
                    <Label>别名</Label>
                    <TextField
                        className={s.input}
                        value={npc.uneed.alias ?? ''}
                        placeholder="多个别名以空格分割"
                        onChange={(_, ns) => {
                            ns = (ns || '').trim()
                            npc.uneed.alias = ns
                            npc_edit$.next(npc)
                        }}
                    ></TextField>
                </li>
                <li className={s.row}>
                    <Label>重要度</Label>
                    <TextField
                        className={s.input}
                        value={(npc.uneed.important ?? 0) + ''}
                        placeholder="重要度默认为最低 0"
                        onChange={(_, ns) => {
                            ns = (ns || '').replace(/[^0-9]/g, '')
                            npc.uneed.important = Math.min(99999, Number(ns))
                            npc_edit$.next(npc)
                        }}
                    ></TextField>
                </li>
                <li className={s.row}>
                    <Label>关系</Label>
                    <div className={s.linkbox}>
                        {uneed.links.map((link) => (
                            <div className={s.linkline} key={link.npc_id}>
                                <div className={s.linkname}>{npc_map.get(link.npc_id)?.base.name}</div>
                                <div className={s.linkdescription}>{link.description}</div>
                                <div className={s.linkaction}>
                                    <IconButton
                                        icon="Edit"
                                        styles={{
                                            root: {
                                                marginRight: '10px',
                                            },
                                        }}
                                        onClick={() => {
                                            set_form_link_description(link.description)
                                            set_form_link_id(link.npc_id)
                                            set_can_show_link_dialog(true)
                                        }}
                                    ></IconButton>
                                    <IconButton
                                        icon="Delete"
                                        onDoubleClick={() => {
                                            npc.uneed.links = npc.uneed.links.filter((v) => v.npc_id !== link.npc_id)
                                            npc_edit$.next(npc)
                                        }}
                                    ></IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <IconButton
                            icon="Add"
                            add_class={[s.iconbtn]}
                            onClick={() => {
                                set_can_show_link_dialog(true)
                            }}
                        ></IconButton>
                    </div>
                </li>
            </ul>
            <Dialog
                hidden={!can_show_link_dialog}
                onDismiss={close_dialog}
                modalProps={{
                    isBlocking: true,
                    topOffsetFixed: true,
                }}
                dialogContentProps={{
                    type: DialogType.normal,
                    closeButtonAriaLabel: 'Close',
                }}
            >
                <Label>选择角色</Label>
                <Dropdown
                    options={npc_li
                        .filter((n) => {
                            if (n.id === form_link_id) {
                                return true
                            }
                            if (n.id === npc.id) {
                                return false
                            }
                            if (npc.uneed.links.map((v) => v.npc_id).includes(n.id)) {
                                return false
                            }
                            return true
                        })
                        .map((n) => ({
                            key: n.id,
                            text: n.base.name,
                            isSelected: n.id === form_link_id,
                        }))}
                    onChange={(_, opt) => {
                        set_form_link_id((opt?.key as string) ?? '')
                    }}
                ></Dropdown>
                <TextField
                    label="描述"
                    value={form_link_description}
                    onChange={(_, ns) => {
                        ns = (ns || '').trim().slice(0, 8)
                        set_form_link_description(ns)
                    }}
                ></TextField>
                <DialogFooter>
                    <PrimaryButton
                        disabled={!form_link_id}
                        onClick={() => {
                            npc.uneed.links = npc.uneed.links.filter((v) => v.npc_id !== form_link_id)
                            npc.uneed.links.push({
                                npc_id: form_link_id,
                                description: form_link_description,
                            })
                            close_dialog()
                            npc_edit$.next(npc)
                        }}
                    >
                        好
                    </PrimaryButton>
                    <DefaultButton onClick={close_dialog} text="取消" />
                </DialogFooter>
            </Dialog>
        </section>
    )
}

function Confirm() {
    return (
        <ThemeButton
            onClick={() => {
                _hand_all_npc_link()
                const re = npc_edited_save()
                if (re === true) {
                    next_router('npc')
                } else {
                    alert('意外错误, 清理npc.json重试')
                }
            }}
            style={{
                margin: '20px 10px 0',
            }}
        >
            好
        </ThemeButton>
    )
}

/** 提交修改时, 处理人物关系, 自动给添加了关系的对方人物加上 */
function _hand_all_npc_link() {
    const npc = npc_edit$.value
    const li = npc_li$.value

    if (!npc) {
        return
    }
    const m = new Map<string, npc>()
    li.forEach((n) => {
        m.set(n.id, n)
    })
    const links = npc.uneed.links
    links.forEach((lk) => {
        const fn = m.get(lk.npc_id)
        if (!fn) {
            return
        }

        const fnhas = fn.uneed.links
        if (!fnhas.find((v) => v.npc_id === npc.id)) {
            fnhas.push({
                npc_id: npc.id,
                description: lk.description,
            })
        }
    })
}
