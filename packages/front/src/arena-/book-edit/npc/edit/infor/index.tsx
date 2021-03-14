import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon, Label, Stack, StackItem, TextField, TooltipHost } from '@fluentui/react-internal'
import { DirectionalHint } from '@fluentui/react'
import { themes } from 'style-/theme'

/**
 */
export default function Infor() {
    return (
        <div className={css(style.Infor)}>
            <Base />
            <Slice />
            <Slice />
        </div>
    )
}

function Base() {
    return (
        <section>
            <div>
                <TextField label="名字" value="12345r" onChange={() => {}} />
            </div>
            <div>
                <TextField label="别名(多个以空格分割)" value="12345r" onChange={() => {}} />
            </div>
            <div>
                <TextField label="备注" value="12345r" onChange={() => {}} />
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
                                color: themes.style_vars.themePrimary,
                            }}
                        >
                            片段1
                        </Label>
                        <Icon iconName="UnknownSolid" />
                    </Stack>
                </TooltipHost>
            </div>
            <Stack>
                <Label>开始章节</Label>
            </Stack>
            <Stack horizontal={true} verticalAlign="center">
                <Label>结束章节</Label>
                <TooltipHost
                    hostClassName={css(style.TooltipHost)}
                    content="如果不设置, 自动寻找下一个开始开始章节, 未找到则默认设定为书目最后一章"
                >
                    <Icon iconName="UnknownSolid" />
                </TooltipHost>
                <TooltipHost hostClassName={css(style.TooltipHost)} content="选择结束章节">
                    <Icon
                        iconName="Settings"
                        className={css(style.SetStartEndChapter)}
                        onClick={() => {
                            console.log(234567)
                        }}
                    />
                </TooltipHost>
            </Stack>
        </section>
    )
}
