// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'

/** 帮助 */
export default function Help() {
    return (
        <div className={s.Help}>
            <About />
            <HotKey />
            <Common />
            <Incident />
            <Table />
        </div>
    )
}

function HotKey() {
    return (
        <section className={s.HotKey}>
            <SectionHeader>快捷键</SectionHeader>

            <div className={s.aline}>退出: 快速连续两次 alt/command + q</div>
            <div className={s.aline}>重载app: alt/command + r</div>
            <div className={s.aline}>切换全屏: alt/command + f</div>
        </section>
    )
}

/** 通用 */
function Common() {
    return (
        <section className={s.Common}>
            <SectionHeader>通用</SectionHeader>
            <div className={s.aline}>删除: 删除按钮双击才会生效</div>
        </section>
    )
}

/** 事件 */
function Incident() {
    return (
        <section className={s.Incident}>
            <SectionHeader>事件</SectionHeader>
            <div className={s.aline}>
                节奏线: 顶部的节奏线, 根据线索设置的开始结束章节字数绘制成. 单击方块可以选中对应事件,
                双击可以使对应事件进入可视区域
            </div>
        </section>
    )
}
/** 表格 */
function Table() {
    return (
        <section className={s.Incident}>
            <SectionHeader>表格</SectionHeader>
            <div className={s.aline}>在表格双击其中一项, 会跳到搜索页自动搜索</div>
        </section>
    )
}
/** 关于  */
function About() {
    return (
        <section className={s.About}>
            <SectionHeader>关于</SectionHeader>
            <div className={s.aline}>作者: 秋无衣</div>
            <div className={s.aline}>有意见建议b站搜索我发私信即可</div>
        </section>
    )
}
/**  */
function TEMP() {
    return (
        <section className={s.Incident}>
            <SectionHeader>通用</SectionHeader>
        </section>
    )
}
