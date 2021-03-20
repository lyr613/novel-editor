import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { DefaultButton, Icon, PrimaryButton, TextField } from '@fluentui/react'
import { _cube } from '../sub'
import { SubCube } from 'subject-/cube'
import { mk_uuid } from 'tool-/uuid'
import { useObservable } from 'rxjs-hooks'
import { _cube_set } from './subj'
import { StyleMake } from 'style-/global'
import LabelHelp, { LabelHelpTxtPreset } from 'component-/label-help'
import { map, switchMap, take } from 'rxjs/operators'

/** RightOption */
export default function RightOption() {
    return (
        <div className={css(s.RightOption)}>
            <TopInfor />
            <Esc />
        </div>
    )
}

function TopInfor() {
    const now_sel = useObservable(() => _cube_set.now_sel$, 'none')
    const l2n = useObservable(() => _cube_set.seled_l2_n$, 0)
    const l1n = useObservable(() => _cube_set.seled_l1_n$, 0)
    let txt = ''
    switch (now_sel) {
        case 'none':
            txt = '选择一个组或词条(按住shift多选)'
            break
        case 'l1':
            txt = `已选择${l1n}组`
            break

        default:
            txt = `已选择${l2n}个词条`
            break
    }
    return (
        <div
            style={{
                fontSize: 14,
            }}
        >
            <div>{txt}, 你是要?</div>
            {now_sel === 'l1' && <NewGroup />}
            {now_sel === 'l1' && l1n === 1 && <EditGroup />}
            {now_sel === 'l1' && l1n === 1 && <NewItem />}
            {now_sel === 'l2' && l2n === 1 && <EditItem />}
        </div>
    )
}

function NewGroup() {
    const [ipt, next_ipt] = useState('')
    return (
        <div className={css(s.ActionBlock)}>
            <LabelHelp label_prop={{ children: '新建组' }} help_txt={LabelHelpTxtPreset.sort_name}></LabelHelp>
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
                        const li = SubCube.li$.value
                        const obj: cube_group_vo = {
                            id: mk_uuid(),
                            name,
                            children: [],
                        }
                        li.push(obj)
                        SubCube.save(li)
                        SubCube.load()
                    }}
                />
            </div>
        </div>
    )
}

function NewItem() {
    const [ipt, next_ipt] = useState('')
    const [remark, next_remark] = useState('')
    return (
        <div className={css(s.ActionBlock)}>
            <LabelHelp label_prop={{ children: '新建词条' }} help_txt={LabelHelpTxtPreset.sort_name}></LabelHelp>
            <div>
                <TextField
                    placeholder="名称"
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                    onDoubleClick={() => {
                        next_ipt('')
                    }}
                />
            </div>
            <div className={css(StyleMake.mar(10, 0, 0))}>
                <TextField
                    placeholder="描述"
                    multiline
                    value={remark}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_remark(ns2)
                    }}
                    onDoubleClick={() => {
                        next_remark('')
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
                        const groups = SubCube.li$.value
                        /** 必然只有一个选中的组 */
                        const sel_group = _cube_set.sel_l1_nodes[0]
                        const n_chap: cube_item_vo = {
                            id: mk_uuid(),
                            name,
                            remark,
                        }
                        sel_group.children.push(n_chap)

                        SubCube.save(groups)
                        SubCube.load()
                        // SubVolume.vo_li$.next()
                        // console.log('cubes', vols)
                        _cube_set.refresh()
                    }}
                />
            </div>
        </div>
    )
}

function EditGroup() {
    const [ipt, next_ipt] = useState('')
    useEffect(() => {
        const ob = _cube_set.seled_l1$
            .pipe(switchMap((n2) => SubCube.li$.pipe(map((li) => li[n2[0]]))))
            .subscribe((group) => {
                next_ipt(group.name)
            })
        return () => ob.unsubscribe()
    }, [])
    return (
        <div className={css(s.ActionBlock)}>
            <div className={css(s.ActionBlockName)}>修改组</div>
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
                        const vol_seled_i = _cube_set.seled_l1$.value[0]

                        const groups = SubCube.li$.value
                        groups[vol_seled_i].name = name
                        SubCube.save(groups)
                        SubCube.load()
                        // SubVolume.vo_li$.next()
                        console.log('groups', groups)
                    }}
                />
            </div>
        </div>
    )
}

/** 修改词条 */
function EditItem() {
    const [ipt, next_ipt] = useState('')
    const [remark, next_remark] = useState('')
    useEffect(() => {
        const ob = _cube_set.show_l2s$
            .pipe(switchMap((items) => _cube_set.seled_l2$.pipe(map((n2) => items[n2[0]]))))
            .subscribe((item) => {
                next_ipt(item?.name)
                next_remark(item?.remark)
            })
        return () => ob.unsubscribe()
    }, [])
    return (
        <div className={css(s.ActionBlock)}>
            <div className={css(s.ActionBlockName)}>修改词条</div>
            <div>
                <TextField
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                />
            </div>
            <div className={css(StyleMake.mar(10, 0, 0))}>
                <TextField
                    placeholder="描述"
                    multiline
                    value={remark}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_remark(ns2)
                    }}
                    onDoubleClick={() => {
                        next_remark('')
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
                        const items: cube_item_vo[] = []
                        _cube_set.show_l2s$.pipe(take(1)).subscribe((li) => {
                            items.push(...li)
                        })
                        const sel_item_n2 = _cube_set.seled_l2$.value

                        const seled_item_i = sel_item_n2[0]
                        items[seled_item_i].name = name

                        const vols = SubCube.li$.value
                        SubCube.save(vols)
                        SubCube.load()
                        _cube_set.seled_l2$.next([...sel_item_n2])
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
            className={css(s.ActionBlock)}
            style={{
                paddingTop: 20,
            }}
        >
            <DefaultButton
                onClick={() => {
                    _cube.show_type$.next('icon')
                }}
            >
                退出词条编辑
            </DefaultButton>
        </div>
    )
}
