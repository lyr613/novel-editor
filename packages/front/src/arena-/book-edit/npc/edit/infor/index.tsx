import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Dialog, DialogFooter, Icon, Label, Stack, StackItem, TextField, TooltipHost } from '@fluentui/react-internal'
import { DefaultButton, DirectionalHint, IconButton, PrimaryButton } from '@fluentui/react'
import { StyleTheme } from 'style-/theme'
import { StyleMake, StylePreset } from 'style-/global'
import DialogSelChapter, { DialogSelChapterShow$, DialogSelChapterConfirmHook$ } from 'component-/dialog-sel-chapter'
import { useObservable } from 'rxjs-hooks'
import { SubNpc } from 'subject-/npc'
import { shallowCopy } from 'tool-/rx-shallow-copy'
import { SubVolume } from 'subject-/volume'
import LabelHelp from 'component-/label-help'
import { _npc } from '../../subj'
import DialogSelCube, { DialogSelCubeConfirmHook$, DialogSelCubeShow$ } from 'component-/dialog-sel-cube'
import DialogSimpleValue, {
    DialogSimpleValueConfirmHook$,
    DialogSimpleValueShow$,
} from 'component-/dialog-simple-value'

/**
 */
export default function Infor() {
    const npc = useObservable(() => SubNpc.edit$.pipe(shallowCopy()), null)
    if (!npc) {
        return null
    }
    const chap_map = SubVolume.chapter_map
    const chap_li = SubVolume.chaper_li

    return (
        <div className={css(style.Infor)}>
            <div className={css(style.EditBox)}>
                <Base npc={npc} />
                {npc.slices.map((_, i) => (
                    <Slice npc={npc} index={i} key={i} chap_li={chap_li} chap_map={chap_map} />
                ))}
            </div>
            <SaveOrEsc />
            <DialogSelChapter />
            <DialogSelCube />
            <DialogSimpleValue />
        </div>
    )
}

function SaveOrEsc() {
    return (
        <div className={css(style.SaveOrEsc)}>
            <DefaultButton
                className={css(StyleMake.mar(0, 10, 0, 0))}
                onClick={() => {
                    SubNpc.load()
                    _npc.show_type$.next('list')
                }}
            >
                返回列表
            </DefaultButton>
            <PrimaryButton
                className={css(StyleMake.mar(0, 10, 0, 0))}
                onClick={() => {
                    SubNpc.save_edit()
                    SubNpc.load()
                    setTimeout(() => {
                        _npc.show_type$.next('list')
                    }, 200)
                }}
            >
                好
            </PrimaryButton>
        </div>
    )
}

interface p_base {
    npc: npc_vo
}
function Base(p: p_base) {
    return (
        <section>
            <div>
                <TextField
                    label="名字"
                    value={p.npc.name}
                    onChange={(_, ns) => {
                        p.npc.name = ns || ''
                        SubNpc.edit$.next(p.npc)
                    }}
                />
            </div>
            <div>
                <TextField
                    label="别名(多个以空格分割)"
                    value={p.npc.alias}
                    onChange={(_, ns) => {
                        p.npc.alias = ns || ''
                        SubNpc.edit$.next(p.npc)
                    }}
                />
            </div>
            <div>
                <TextField
                    label="描述"
                    multiline
                    value={p.npc.remark}
                    onChange={(_, ns) => {
                        p.npc.remark = ns || ''
                        SubNpc.edit$.next(p.npc)
                    }}
                />
            </div>
        </section>
    )
}

interface p_slice {
    npc: npc_vo
    index: number
    chap_li: chapter_vo[]
    chap_map: Map<string, chapter_vo>
}
function Slice(p: p_slice) {
    const slice_obj = p.npc.slices[p.index]
    const [i0, i1] = get_chapter_range(slice_obj, p.chap_map, p.chap_li)

    return (
        <section className={css(style.Slice)}>
            <div className={css(style.SliceSplitLine)} />
            <div className={css(style.SliceSplitIndex)}>
                <TooltipHost
                    content="多个切片可以描述角色的不同时期, 根据开始章节自动排序"
                    directionalHint={DirectionalHint.topCenter}
                >
                    <Stack horizontal={true} verticalAlign="center">
                        <Label
                            style={{
                                color: StyleTheme.style_vars.themePrimary,
                            }}
                        >
                            切片{p.index + 1}
                        </Label>
                        <Icon iconName="UnknownSolid" />
                    </Stack>
                </TooltipHost>
            </div>
            <Stack horizontal>
                <IconButton
                    iconProps={{ iconName: 'Copy' }}
                    title="复制切片"
                    onClick={() => {
                        const sli2 = SubNpc.copy_slice(slice_obj)
                        p.npc.slices.splice(p.index, 0, sli2)
                        SubNpc.edit$.next(p.npc)
                    }}
                />
                <IconButton iconProps={{ iconName: 'Delete' }} title="删除切片" />
            </Stack>
            <Stack horizontal={true} verticalAlign="center">
                <LabelHelp
                    label_prop={{ children: '开始章节' }}
                    help_txt={['如果只有一个切片可以不设置, 自动设置为第一章', '如果有多个切片必须设置']}
                ></LabelHelp>
                <Icon
                    iconName="Settings"
                    className={css(style.SetStartEndChapter, StylePreset.hoverfocu)}
                    onClick={() => {
                        DialogSelChapterConfirmHook$.next((vol: volume_vo | null, chap: chapter_vo | null) => {
                            if (chap) {
                                slice_obj.start_chapter = chap.id
                                SubNpc.edit$.next(p.npc)
                            }
                            // console.log(vol?.name, chap?.name)
                        })
                        DialogSelChapterShow$.next(true)
                    }}
                />
            </Stack>
            <div className={css(StyleMake.padd(0, 0, 0, 20), StyleMake.fts(14))}>
                {p.chap_map.get(slice_obj.start_chapter)?.name}
            </div>
            <Stack horizontal={true} verticalAlign="center">
                <LabelHelp
                    label_prop={{ children: '结束章节' }}
                    help_txt={['如果不设置, 自动设置为下一个切片的开始章节', '如果是最后一个切片, 自动设置为最后一章']}
                ></LabelHelp>
                <Icon
                    iconName="Settings"
                    className={css(style.SetStartEndChapter, StylePreset.hoverfocu)}
                    onClick={() => {
                        DialogSelChapterConfirmHook$.next((vol: volume_vo | null, chap: chapter_vo | null) => {
                            // console.log(vol?.name, chap?.name)
                            if (chap) {
                                slice_obj.end_chapter = chap.id
                                SubNpc.edit$.next(p.npc)
                            }
                        })
                        DialogSelChapterShow$.next(true)
                        // console.log(234567)
                    }}
                />
            </Stack>
            <div className={css(StyleMake.padd(0, 0, 0, 20), StyleMake.fts(14))}>
                {p.chap_map.get(slice_obj.end_chapter)?.name}
            </div>
            {/* 范围条 */}
            <div
                className={css(StyleMake.mar(10, 0), StyleMake.wh('100%', 20), StyleMake.pos('relative'))}
                style={{
                    backgroundColor: StyleTheme.style_vars.themeTertiary,
                    opacity: 0.6,
                    overflow: 'hidden',
                }}
            >
                <div
                    className={css(StyleMake.pos('absolute', 0, i0 + '%'), StyleMake.wh(i1 + '%', '100%'))}
                    style={{
                        backgroundColor: StyleTheme.style_vars.themeSecondary,
                        borderBottom: `10px solid ${StyleTheme.style_vars.themePrimary}`,
                        boxSizing: 'border-box',
                    }}
                ></div>
            </div>
            {/* 立方体 */}
            <LabelHelp
                label_prop={{ children: '立方体' }}
                help_txt={[
                    '通过预设的词条, 多维度描述角色 ',
                    '如法术组: 火球术, 神罗天征; 物品组: 村里最强的剑',
                    '可以给词条设置数值, 如数据组: 力量99, 智力1',
                    '----',
                    '双击词条设置数值, 按住ctrl单击删除词条或组',
                ]}
            ></LabelHelp>

            <table className={css(style.CubeTable)}>
                <tbody>
                    {slice_obj.cube.map((group, y) => (
                        <tr key={group.id}>
                            <td
                                className={css(style.CubeTd, style.CubeTdLeft)}
                                onClick={() => {
                                    slice_obj.cube = slice_obj.cube.filter((v) => v.id !== group.id)
                                    SubNpc.edit$.next(p.npc)
                                }}
                            >
                                <div className={css(style.CubeTdRightItem)}>{group.name_show}</div>
                            </td>
                            <td className={css(style.CubeTd, style.CubeTdRight)}>
                                {group.children.map((item, xi) => (
                                    <div
                                        key={item.id}
                                        className={css(style.CubeTdRightItem)}
                                        onDoubleClick={() => {
                                            function hook(value: string) {
                                                const n = parseInt(value, 10)
                                                slice_obj.cube[y].children[xi].level = n
                                                SubNpc.edit$.next(p.npc)
                                            }
                                            DialogSimpleValueConfirmHook$.next(hook)
                                            DialogSimpleValueShow$.next(true)
                                        }}
                                        onClick={(e) => {
                                            if (e.ctrlKey) {
                                                // 删除这个词条
                                                slice_obj.cube[y].children = slice_obj.cube[y].children.filter(
                                                    (v) => v.id !== item.id,
                                                )
                                                SubNpc.edit$.next(p.npc)
                                            }
                                        }}
                                    >
                                        {item.name_show}
                                        {item.level ? `(${item.level})` : ''}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 立方体 - 添加按钮 */}
            <Stack>
                <IconButton
                    iconProps={{ iconName: 'Add' }}
                    onClick={() => {
                        DialogSelCubeConfirmHook$.next((groups) => {
                            groups.forEach((gp) => {
                                const maybe_did_has = slice_obj.cube.find((v) => v.id === gp.id)
                                if (maybe_did_has) {
                                    // 已经有这个组, 比对词条
                                    const item_has_map = new Map<string, boolean>()
                                    maybe_did_has.children.forEach((item) => {
                                        item_has_map.set(item.id, true)
                                    })
                                    gp.children.forEach((item) => {
                                        if (!item_has_map.get(item.id)) {
                                            maybe_did_has.children.push(item)
                                        }
                                    })
                                } else {
                                    slice_obj.cube.push(gp)
                                }
                            })
                            // slice_obj.cube = groups
                            SubNpc.edit$.next(p.npc)
                        })
                        DialogSelCubeShow$.next(true)
                    }}
                ></IconButton>
            </Stack>
            <Stack>
                <TextField
                    label="备注"
                    multiline
                    value={slice_obj.remark}
                    onChange={(_, ns) => {
                        slice_obj.remark = ns || ''
                        SubNpc.edit$.next(p.npc)
                    }}
                ></TextField>
            </Stack>
        </section>
    )
}

/**
 * 获取[left, width]
 * @param slice
 * @param chap_map
 * @param chap_li
 * @returns
 */
function get_chapter_range(slice: npc_slice_vo, chap_map: id_map_of<chapter_vo>, chap_li: chapter_vo[]) {
    const st = slice.start_chapter
    const ed = slice.end_chapter
    const stc = chap_map.get(st)
    const edc = chap_map.get(ed)
    let [i0, i1] = [0, 100]
    const len = chap_li.length
    if (stc) {
        const sti = chap_li.indexOf(stc)
        i0 = ((sti * 100) / len) | 0
    }
    if (edc) {
        const edi = chap_li.indexOf(edc)
        i1 = (((edi + 1) * 100) / len) | 0
    }
    i1 = Math.min(100, i1 + 1)
    i1 = i1 - i0
    // console.log(i0, i1)

    return [i0, i1]
}
