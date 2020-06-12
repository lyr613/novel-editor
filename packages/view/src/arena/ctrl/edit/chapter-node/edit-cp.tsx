// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog'
import { PrimaryButton, DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button'
import { TextField, ChoiceGroup, IChoiceGroupOption, Dropdown, IDropdownOption } from 'office-ui-fabric-react'
import { Icon, Slider, Label } from 'office-ui-fabric-react'
import { chapter_list$, book_use$, of_chapter, chapter_use$, chapter_save, find_chapter_list_auto } from '@/source'
import { useObservable } from 'rxjs-hooks'
import { id32 } from '@/function/id32'
import { fs_write, mk_dir, fs_rename } from '@/source/fs-common'
import { BehaviorSubject } from 'rxjs'
import { filter, switchMap, map, take } from 'rxjs/operators'

// 编辑和删除章的弹窗

/** 修改还是添加 */
export const action_cp$ = new BehaviorSubject<'change' | 'add'>('change')
/** 隐藏章弹窗 */
export const hidd_cp$ = new BehaviorSubject(true)

/** 编辑章信息 */
export function EditChapter() {
    // 章位置
    const [posi, set_posi] = useState<'last' | 'first' | 'insert'>('last')
    // 章名字
    const [cp_name, set_cp_name] = useState('')
    // 在某章后, id
    const [after_cid, set_after_cid] = useState('')
    /** 章列表 */
    const cps = useObservable(() => chapter_list$.pipe(map((li) => li.filter((v) => !v.hidden))), [])
    /** 聚焦的章 */
    const focu = useObservable(() => chapter_use$)
    /** 聚焦的书 */
    const book = useObservable(() => book_use$)
    /** 操作 添加或删除 */
    const action = useObservable(() => action_cp$, 'add')
    /** 隐藏章弹窗 */
    const hidd = useObservable(() => hidd_cp$, true)
    /** 位置单选选项 */
    const options: IChoiceGroupOption[] = [
        { key: 'first', text: '开头' },
        { key: 'last', text: '末尾' },
        { key: 'insert', text: '在某章后' },
    ]
    /** 章下拉选项 */
    const cp_opts: IDropdownOption[] = cps
        .filter((v) => v.id !== focu?.id)
        .map((v) => {
            return {
                key: v.id,
                text: v.name,
                isSelected: v.id === after_cid,
            }
        })
    useEffect(() => {
        // 修改时拷贝信息
        const ob = action_cp$
            .pipe(
                filter((s) => s === 'change'),
                switchMap(() => chapter_use$.pipe(take(1))),
                filter((v) => !!v),
                map((v) => v!),
            )
            .subscribe((cp) => {
                const li = chapter_list$.value.filter((v) => !v.hidden)
                const i = li.findIndex((v) => v.id === cp.id)
                if (i === 0) {
                    set_posi('first')
                } else if (i === li.length - 1) {
                    set_posi('last')
                } else {
                    set_after_cid(li[i - 1].id)
                    set_posi('insert')
                }
                set_cp_name(cp.name)
            })
        return () => ob.unsubscribe()
    }, [])
    // 隐藏时恢复初始状态
    useEffect(() => {
        if (hidd) {
            setTimeout(() => {
                set_cp_name('')
                set_posi('last')
                set_after_cid('')
                action_cp$.next('add')
            }, 500)
        }
    }, [hidd])
    if (!book) {
        return null
    }
    return (
        <Dialog
            hidden={hidd}
            onDismiss={() => hidd_cp$.next(true)}
            modalProps={{
                isBlocking: true,
                topOffsetFixed: true,
            }}
            dialogContentProps={{
                type: DialogType.normal,
                closeButtonAriaLabel: 'Close',
            }}
        >
            <TextField
                label="章名"
                value={cp_name}
                onChange={(_, ns) => {
                    set_cp_name((ns || '').trim())
                }}
            ></TextField>
            {}
            <Label>位置</Label>
            <ChoiceGroup
                options={options}
                selectedKey={posi}
                onChange={(_, opt) => {
                    const k = opt?.key ?? 'last'
                    if (k === 'insert') {
                        find_chapter_list_auto()
                    }
                    set_posi(k as any)
                }}
            ></ChoiceGroup>
            {/* 选择在某章后时, 展示下拉 */}
            {posi === 'insert' && (
                <Dropdown
                    options={cp_opts}
                    onChange={(_, opt) => {
                        set_after_cid((opt?.key as string) ?? '')
                    }}
                ></Dropdown>
            )}
            <DialogFooter>
                <PrimaryButton
                    disabled={!cp_name.length}
                    onClick={async () => {
                        // 操作章列表, 改写chapter.json文件
                        const id = action === 'change' ? focu?.id ?? id32() : id32()
                        const children = action === 'change' ? focu?.children ?? [] : []
                        const the_cp = of_chapter({ id, name: cp_name, children })
                        const arr = chapter_list$.value.filter((v) => {
                            if (action === 'add') {
                                return true
                            }
                            return v.id !== focu?.id
                        })
                        if (posi === 'last') {
                            arr.push(the_cp)
                        } else if (posi === 'first') {
                            arr.unshift(the_cp)
                        } else {
                            const ni = arr.findIndex((v) => v.id === after_cid) + 1
                            arr.splice(ni, 0, the_cp)
                        }
                        chapter_list$.next(arr)
                        const opt_re = await chapter_save()
                        if (!opt_re) {
                            alert('修改章节配置文件失败')
                            return
                        }
                        find_chapter_list_auto()
                        mk_dir([book.src, 'chapters'])
                        console.log('修改章成功')
                        hidd_cp$.next(true)
                    }}
                    text="好"
                />
                <DefaultButton
                    onClick={() => {
                        hidd_cp$.next(true)
                    }}
                    text="取消"
                />
            </DialogFooter>
        </Dialog>
    )
}

// ------------- 删除 -------------

/** 显示 删除章 弹窗 */
export const show_del_cp$ = new BehaviorSubject(false)

/** 删除章 */
export function DeleteChapter() {
    /** 显示弹窗 */
    const show = useObservable(() => show_del_cp$, false)
    /** 聚焦的章 */
    const focu = useObservable(() => chapter_use$)
    /** 聚焦的书 */
    const book = useObservable(() => book_use$)
    if (!focu || !book) {
        return null
    }
    return (
        <Dialog
            hidden={!show}
            onDismiss={() => show_del_cp$.next(false)}
            modalProps={{
                isBlocking: true,
                // topOffsetFixed: true,
            }}
            dialogContentProps={{
                title: '删除章',
                subText: '磁盘上的内容不会被删除, 妮随时可以在回收站恢复这一章',
                type: DialogType.normal,
                closeButtonAriaLabel: 'Close',
            }}
        >
            <DialogFooter>
                <DefaultButton
                    onClick={async () => {
                        show_del_cp$.next(false)
                        focu.hidden = true
                        const opt_re = await chapter_save()
                        if (opt_re) {
                            find_chapter_list_auto()
                            console.log('删除成功')
                        } else {
                            alert('删除失败')
                        }
                    }}
                >
                    删除
                </DefaultButton>
                <DefaultButton
                    onClick={() => {
                        show_del_cp$.next(false)
                    }}
                >
                    取消
                </DefaultButton>
            </DialogFooter>
        </Dialog>
    )
}
