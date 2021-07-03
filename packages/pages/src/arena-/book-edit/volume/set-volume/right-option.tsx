import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { _volume_set2 } from './sub'
import { DefaultButton, PrimaryButton, TextField, Dropdown } from '@fluentui/react'
import { SubVolume } from 'subject-/volume'
import { mk_uuid } from 'tool-/uuid'
import { take } from 'rxjs/operators'
import { StyleTheme } from 'style-/theme'
import { SubBookEdit } from 'subject-/book-edit'

/**
 */
export default function RightOption() {
    return (
        <div className={css(style.RightOption)}>
            <TopInfor />
        </div>
    )
}

function TopInfor() {
    const now_sel = useObservable(() => _volume_set2.now_sel$, 'none')
    const n_l1 = useObservable(() => _volume_set2.seled_l1_count$, 0)
    const n_l2 = useObservable(() => _volume_set2.seled_l2_count$, 0)
    let txt = ''
    switch (now_sel) {
        case 'none':
            txt = '选择一个卷或章(按住shift多选)'
            break
        case 'l1':
            txt = `已选择${n_l1}卷`
            break

        default:
            txt = `已选择${n_l2}章`
            break
    }
    return (
        <div
            style={{
                fontSize: 14,
            }}
        >
            <div>{txt}, 你是要?</div>
            {<NewVolume />}
            {now_sel === 'l1' && n_l1 === 1 && <ReNameVolume />}
            <div
                style={{
                    margin: '20px 0',
                    height: 10,
                    backgroundColor: StyleTheme.style_vars.themePrimary,
                    opacity: 0.3,
                }}
            ></div>
            {now_sel === 'l1' && n_l1 === 1 && <NewChapter />}
            {now_sel === 'l2' && n_l2 === 1 && <ReNameChapter />}
            {now_sel === 'l2' && n_l2 > 0 && <MoveTo />}
            <Esc />
        </div>
    )
}

function MoveTo() {
    const vols = useObservable(() => SubVolume.li$, [])
    const data = vols.map((v) => ({
        key: v.id,
        text: v.name,
    }))
    const [sel_id, next_sel_id] = useState('')
    return (
        <div className={css(style.ActionBlock)}>
            <div className={css(style.ActionBlockName)}>移动这些章到卷</div>
            <Dropdown
                options={data}
                selectedKey={sel_id}
                onChange={(_, opt) => {
                    const id = (opt?.key ?? '') as string
                    next_sel_id(id)
                }}
            ></Dropdown>
            <div
                style={{
                    marginTop: 10,
                }}
            >
                <PrimaryButton
                    text="好"
                    onClick={() => {
                        //
                        const seled_chap_li = _volume_set2.seled_l2_li
                        const all_vol = SubVolume.li$.value
                        const seled_chap_map = _volume_set2.seled_l2_map$.value
                        const all2 = all_vol.map((vol) => {
                            vol.children = vol.children.filter((chap) => !seled_chap_map.get(chap.id))
                            if (vol.id === sel_id) {
                                vol.children.push(...seled_chap_li)
                            }
                            return vol
                        })
                        // console.log(seled_chap_li.map((v) => v.name))
                        SubVolume.save(all2)
                        SubVolume.load()
                        // SubVolume.vo_li$.next()
                        // console.log('vols', vols)
                        _volume_set2.clear()
                    }}
                />
            </div>
        </div>
    )
}

/** 新章 */
function NewChapter() {
    const [ipt, next_ipt] = useState('')
    return (
        <div className={css(style.ActionBlock)}>
            <div className={css(style.ActionBlockName)}>新建章</div>
            <div>
                <TextField
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 10,
                }}
            >
                <PrimaryButton
                    text="好"
                    onClick={() => {
                        const name = ipt.trim()
                        if (!name) {
                            alert('需要非空的名字')
                            return
                        }
                        const vols = SubVolume.li$.value
                        /** 必然只有一个选中的卷 */
                        const sel_vol = _volume_set2.seled_l1_li[0]
                        const n_chap: chapter_vo = {
                            id: mk_uuid(),
                            name,
                            src: '',
                            sort: 0,
                            name_show: '',
                        }
                        sel_vol.children.push(n_chap)

                        SubVolume.save(vols)
                        SubVolume.load()
                        next_ipt('')
                        // SubVolume.vo_li$.next()
                        console.log('vols', vols)
                        // _volume_set2.clear()
                    }}
                />
            </div>
        </div>
    )
}

/** 修改卷 */
function ReNameVolume() {
    const [ipt, next_ipt] = useState('')
    useEffect(() => {
        const ob = _volume_set2.seled_l1_li$.subscribe((li) => {
            const names = li.map((v) => v.name).join(', ')
            next_ipt(names)
        })
        return () => ob.unsubscribe()
    }, [])
    return (
        <div className={css(style.ActionBlock)}>
            <div className={css(style.ActionBlockName)}>修改卷</div>
            <div>
                <TextField
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 10,
                }}
            >
                <PrimaryButton
                    text="好"
                    onClick={() => {
                        const name = ipt.trim()
                        if (!name) {
                            alert('需要非空的名字')
                            return
                        }
                        const vol_seled = _volume_set2.seled_l1_li[0]

                        const vols = SubVolume.li$.value
                        vol_seled.name = name
                        SubVolume.save(vols)
                        SubVolume.load()
                        // SubVolume.vo_li$.next()
                        console.log('vols', vols)
                        next_ipt('')
                    }}
                />
            </div>
        </div>
    )
}

/** 修改章 */
function ReNameChapter() {
    const [ipt, next_ipt] = useState('')
    useEffect(() => {
        const ob = _volume_set2.seled_l2_li$.subscribe((li) => {
            const n = li.length ? li[0].name : ''
            next_ipt(n)
        })
        return () => ob.unsubscribe()
    }, [])
    return (
        <div className={css(style.ActionBlock)}>
            <div className={css(style.ActionBlockName)}>修改章</div>
            <div>
                <TextField
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 10,
                }}
            >
                <PrimaryButton
                    text="好"
                    onClick={() => {
                        const name = ipt.trim()
                        if (!name) {
                            alert('需要非空的名字')
                            return
                        }
                        const chap_seled = _volume_set2.seled_l2_li[0]
                        chap_seled.name = name

                        const vols = SubVolume.li$.value
                        SubVolume.save(vols)
                        SubVolume.load()
                        next_ipt('')
                        // _volume_set2.clear()
                        // SubVolume.vo_li$.next()
                        // console.log('vols', vols)
                    }}
                />
            </div>
        </div>
    )
}
/** 新卷 */
function NewVolume() {
    const [ipt, next_ipt] = useState('')
    return (
        <div className={css(style.ActionBlock)}>
            <div className={css(style.ActionBlockName)}>新建卷</div>
            <div>
                <TextField
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 10,
                }}
            >
                <PrimaryButton
                    text="好"
                    onClick={() => {
                        const name = ipt.trim()
                        if (!name) {
                            alert('需要非空的名字')
                            return
                        }
                        const vols = SubVolume.li$.value
                        const nvol: volume_vo = {
                            id: mk_uuid(),
                            name,
                            children: [],
                            expand: true,
                            sort: 0,
                            name_show: '',
                        }
                        const nvols = [...vols, nvol]
                        SubVolume.save(nvols)
                        SubVolume.load()
                        next_ipt('')
                        // SubVolume.vo_li$.next()
                        // console.log('vols', vols)
                    }}
                />
            </div>
        </div>
    )
}

/** 退出 */
function Esc() {
    return (
        <div
            className={css(style.ActionBlock)}
            style={{
                paddingTop: 20,
            }}
        >
            <DefaultButton
                onClick={() => {
                    SubBookEdit.entry_show$.next('')
                }}
            >
                退出卷章编辑
            </DefaultButton>
        </div>
    )
}
