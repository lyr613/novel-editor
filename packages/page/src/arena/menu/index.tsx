import React, { useState, useEffect } from 'react'
import { style as s } from './style'
import { next_router, routers } from '@/router'
import { useObservable } from 'rxjs-hooks'
import { book_use$ } from '@/source/book'
import { useLocation } from 'react-router-dom'
import { editer_setting$ } from '@/subject'
import * as ap from 'aphrodite/no-important'
const css = ap.css
import { global_style as gs, style_creater as sc } from '@/style/global'

export function Menu() {
    // const book = useObservable(() => book_use$)
    // const editer_set = useObservable(() => editer_setting$)
    const book = 1
    const editer_set = { git: false }
    return (
        <div className={css(s.root, sc.wh('60px', '100vh'))}>
            <div className={css(gs.flex, gs.flwc, gs.flhc, sc.wh('100%', '60px'), sc.fts(16))}></div>

            <ul className={css(s.list)}>
                <li
                    className={css(s.wline, sc.wh(undefined, 2), sc.mar(5, 0))}
                    style={{
                        marginTop: 0,
                    }}
                />
                <Item path="shelf">{routers.shelf}</Item>
                {/* <Item path="chapter" disable={!book}>
					{routers.chapter}
				</Item> */}
                <Item path="edit" disable={!book}>
                    {routers.edit}
                </Item>
                <li className={css(s.wline, sc.wh(undefined, 2), sc.mar(5, 0))} />
                <Item path="search" disable={!book}>
                    搜索
                </Item>
                <Item path="outline" disable={!book}>
                    {routers.outline}
                </Item>
                <Item path="incident" disable={!book}>
                    {routers.incident}
                </Item>
                <Item path="npc" disable={!book}>
                    角色
                </Item>
                <Item path="table" disable={!book}>
                    表格
                </Item>
                <Item path="map" disable={!book}>
                    地图
                </Item>
                {editer_set?.git && (
                    <Item path="git" disable={!book}>
                        仓库
                    </Item>
                )}
                <Item path="statistics" disable={!book}>
                    统计
                </Item>
                <li className={css(s.wline, sc.wh(undefined, 2), sc.mar(5, 0))} />
                <Item path="option">设置</Item>
                <Item path="zip">归档</Item>
                <Item path="help">{routers.help}</Item>
                {/* <Item path="setting">设置</Item> */}
            </ul>
        </div>
    )
}

interface item {
    children: string
    disable?: boolean
    path: routers
}
function Item(p: item) {
    const { pathname } = useLocation()
    const now_path = pathname.split(/[\\/]/)[1]
    const cls = css(s.item, p.disable ? s.item_disable : s.item_able, now_path === p.path ? undefined : undefined)
    return (
        <li
            className={cls}
            onClick={() => {
                if (p.disable) {
                    return
                }
                next_router(p.path)
            }}
        >
            {p.children}
        </li>
    )
}
