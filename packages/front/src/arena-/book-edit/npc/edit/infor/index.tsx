import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Dialog, DialogFooter, Icon, Label, Stack, StackItem, TextField, TooltipHost } from '@fluentui/react-internal'
import { DefaultButton, DirectionalHint, PrimaryButton } from '@fluentui/react'
import { StyleTheme } from 'style-/theme'
import { StylePreset } from 'style-/global'
import DialogSelChapter, { DialogSelChapterShow$, DialogSelChapterConfirmHook$ } from 'component-/dialog-sel-chapter'

/**
 */
export default function Infor() {
    return (
        <div className={css(style.Infor)}>
            <Base />
            <Slice />
            <Slice />
            <DialogSelChapter />
        </div>
    )
}

function Base() {
    return (
        <section>
            <div>
                <TextField label="名字" value="111" onChange={() => {}} />
            </div>
            <div>
                <TextField label="别名(多个以空格分割)" value="222" onChange={() => {}} />
            </div>
            <div>
                <TextField label="备注" value="33" onChange={() => {}} />
            </div>
        </section>
    )
}

function Slice() {
    return (
        <section className={css(style.Slice)}>
            <div className={css(style.SliceSplitLine)} />
            <div className={css(style.SliceSplitIndex)}>
                <TooltipHost
                    content="多个片段可以描述角色的不同时期, 根据开始章节自动排序"
                    directionalHint={DirectionalHint.topCenter}
                >
                    <Stack horizontal={true} verticalAlign="center">
                        <Label
                            style={{
                                color: StyleTheme.style_vars.themePrimary,
                            }}
                        >
                            片段1
                        </Label>
                        <Icon iconName="UnknownSolid" />
                    </Stack>
                </TooltipHost>
            </div>
            <Stack horizontal={true} verticalAlign="center">
                <Label>开始章节</Label>
                <Icon
                    iconName="Settings"
                    className={css(style.SetStartEndChapter, StylePreset.hoverfocu)}
                    onClick={() => {
                        console.log(234567)
                    }}
                />
            </Stack>
            <Stack horizontal={true} verticalAlign="center">
                <Label>结束章节</Label>
                <TooltipHost
                    hostClassName={css(style.TooltipHost)}
                    content="如果不设置, 自动寻找下一个开始开始章节, 未找到则默认设定为书目最后一章"
                >
                    <Icon iconName="UnknownSolid" />
                </TooltipHost>
                <Icon
                    iconName="Settings"
                    className={css(style.SetStartEndChapter, StylePreset.hoverfocu)}
                    onClick={() => {
                        DialogSelChapterConfirmHook$.next((vol: volume_vo | null, chap: chapter_vo | null) => {
                            console.log(vol?.name, chap?.name)
                        })
                        DialogSelChapterShow$.next(true)
                        console.log(234567)
                    }}
                />
            </Stack>
        </section>
    )
}
