import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { StyleTheme } from 'style-/theme'
import { SubBookEdit } from 'subject-/book-edit'

/**
 * 入口栏
 */
export default function EntryBar() {
    return (
        <div
            className={style.EntryBar}
            style={{
                backgroundColor: StyleTheme.style_vars.themeTertiary,
            }}
        >
            {/* --- */}
            <div className={style.Item}>
                <div
                    className={style.ItemIcon}
                    onClick={() => {
                        SubBookEdit.entry_hold_volume$.next(true)
                    }}
                >
                    <Icon iconName="DataConnectionLibrary" />
                </div>
                <div className={style.ItemContainer}>
                    <div className={style.ItemTitle}>卷章</div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="编辑"
                        onClick={() => {
                            SubBookEdit.entry_show$.next('volume-set')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="查看"
                        onClick={() => {
                            SubBookEdit.entry_hold_volume$.next(true)
                        }}
                    >
                        <Icon iconName="Pinned" />
                    </div>
                </div>
            </div>
            {/* --- */}
            <div className={style.Item}>
                <div
                    className={style.ItemIcon}
                    onClick={() => {
                        SubBookEdit.entry_show$.next('npc-view')
                    }}
                >
                    <Icon iconName="People" />
                </div>
                <div className={style.ItemContainer}>
                    <div className={style.ItemTitle}>角色</div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="编辑"
                        onClick={() => {
                            SubBookEdit.entry_show$.next('npc-set')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="查看"
                        onClick={() => {
                            SubBookEdit.entry_show$.next('npc-view')
                        }}
                    >
                        <Icon iconName="Decimals" />
                    </div>
                </div>
            </div>

            {/* --- */}
            <div className={style.Item}>
                <div
                    className={style.ItemIcon}
                    onClick={() => {
                        SubBookEdit.entry_show$.next('cube-set')
                    }}
                >
                    <Icon iconName="CubeShape" />
                </div>
                <div className={style.ItemContainer}>
                    <div className={style.ItemTitle}>词条</div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="编辑"
                        onClick={() => {
                            SubBookEdit.entry_show$.next('cube-set')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                </div>
            </div>
            {/* --- 线索 --- */}
            <div className={style.Item}>
                <div
                    className={style.ItemIcon}
                    onClick={() => {
                        SubBookEdit.entry_show$.next('threads-set')
                    }}
                >
                    <Icon iconName="BranchFork" />
                </div>
                <div className={style.ItemContainer}>
                    <div className={style.ItemTitle}>线索</div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="编辑"
                        onClick={() => {
                            SubBookEdit.entry_show$.next('threads-set')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                </div>
            </div>
            {/* --- 最近章节 --- */}
            <div className={style.Item}>
                <div
                    className={style.ItemIcon}
                    onClick={() => {
                        SubBookEdit.entry_hold_recent_volume$.next(true)
                    }}
                >
                    <Icon iconName="Recent" />
                </div>
                <div className={style.ItemContainer}>
                    <div className={style.ItemTitle}>最近章节</div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="查看"
                        onClick={() => {
                            SubBookEdit.entry_hold_recent_volume$.next(true)
                        }}
                    >
                        <Icon iconName="Pinned" />
                    </div>
                </div>
            </div>
            {/* --- 调整编辑窗口 ---  */}
            <div className={style.Item}>
                <div
                    className={style.ItemIcon}
                    onClick={() => {
                        SubBookEdit.entry_show$.next('editer-size')
                    }}
                >
                    <Icon iconName="Move" />
                </div>
                <div className={style.ItemContainer}>
                    <div className={style.ItemTitle}>调整编辑窗口</div>
                    <div
                        className={[style.ItemIcon, style.ItemIcon2].join(' ')}
                        title="编辑"
                        onClick={() => {
                            SubBookEdit.entry_show$.next('editer-size')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                </div>
            </div>
        </div>
    )
}
