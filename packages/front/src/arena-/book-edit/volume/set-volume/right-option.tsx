import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { _volume_set } from './sub'
import { DefaultButton, PrimaryButton, TextField } from '@fluentui/react'
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
    const now_sel = useObservable(() => _volume_set.now_sel$, 'none')
    const chap_n = useObservable(() => _volume_set.seled_chapter_n$, 0)
    const vol_n = useObservable(() => _volume_set.seled_volume_n$, 0)
    let txt = ''
    switch (now_sel) {
        case 'none':
            txt = '选择一个卷或章(按住shift多选)'
            break
        case 'chapter':
            txt = `已选择${chap_n}章`
            break

        default:
            txt = `已选择${vol_n}卷`
            break
    }
    return (
        <div
            style={{
                fontSize: 14,
            }}
        >
            <div>{txt}, 你是要?</div>
            {now_sel === 'volume' && vol_n === 1 && <ReNameVolume />}
            {now_sel !== 'chapter' && <NewVolume />}
            <div
                style={{
                    margin: 20,
                    height: 2,
                    backgroundColor: StyleTheme.style_vars.themePrimary,
                }}
            ></div>
            {now_sel === 'chapter' && chap_n === 1 && <ReNameChapter />}
            {now_sel === 'volume' && vol_n === 1 && <NewChapter />}
            <Esc />
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
                        const sel_vol = _volume_set.sel_vol_nodes[0]
                        const n_chap: chapter_vo = {
                            id: mk_uuid(),
                            name,
                            src: '',
                        }
                        sel_vol.children.push(n_chap)

                        SubVolume.save(vols)
                        SubVolume.load()
                        // SubVolume.vo_li$.next()
                        console.log('vols', vols)
                        _volume_set.refresh()
                    }}
                />
            </div>
        </div>
    )
}

/** 修改卷 */
function ReNameVolume() {
    const [ipt, next_ipt] = useState('')
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
                        const vol_seled_i = _volume_set.seled_volume$.value[0]

                        const vols = SubVolume.li$.value
                        vols[vol_seled_i].name = name
                        SubVolume.save(vols)
                        SubVolume.load()
                        // SubVolume.vo_li$.next()
                        console.log('vols', vols)
                    }}
                />
            </div>
        </div>
    )
}

/** 修改章 */
function ReNameChapter() {
    const [ipt, next_ipt] = useState('')
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
                        const chaps: chapter_vo[] = []
                        _volume_set.show_chapters$.pipe(take(1)).subscribe((li) => {
                            chaps.push(...li)
                        })
                        const sel_chap_n2 = _volume_set.seled_chapter$.value

                        const chap_seled_i = sel_chap_n2[0]
                        chaps[chap_seled_i].name = name

                        const vols = SubVolume.li$.value
                        SubVolume.save(vols)
                        SubVolume.load()
                        _volume_set.seled_chapter$.next([...sel_chap_n2])
                        // SubVolume.vo_li$.next()
                        // console.log('vols', vols)
                    }}
                />
            </div>
        </div>
    )
}
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
                        }
                        const nvols = [...vols, nvol]
                        SubVolume.save(nvols)
                        SubVolume.load()
                        // SubVolume.vo_li$.next()
                        // console.log('vols', vols)
                    }}
                />
            </div>
        </div>
    )
}

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
