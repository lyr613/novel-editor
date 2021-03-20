import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Label } from '@fluentui/react-internal'
import { DirectionalHint, Icon, ILabelProps, TooltipHost } from '@fluentui/react'
import { StylePreset } from 'style-/global'

interface p {
    label_prop: ILabelProps
    help_txt: string
}
/**
 */
export default function LabelHelp(p: p) {
    return (
        <div className={css(style.LabelHelp)}>
            <Label {...p.label_prop}></Label>
            <TooltipHost
                className={css(style.TooltipHost)}
                content={p.help_txt}
                directionalHint={DirectionalHint.topCenter}
            >
                <Icon iconName="UnknownSolid" className={css(StylePreset.hoverfocu, style.Icon)} />
            </TooltipHost>
        </div>
    )
}

/** 复用一些帮助 */
export const LabelHelpTxtPreset = {
    sort_name:
        '名字以数字#前缀自动进行排序, 如103#火球术排在199#神罗天征前面.   同时并不显示排序前缀, 如103#火球术显示为 火球术',
}
