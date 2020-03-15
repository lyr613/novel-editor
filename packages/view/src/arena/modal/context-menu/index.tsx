// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { menu_config$, menu_select$ } from './subj'

/**
 * 右键菜单
 */
export default function ContextMenu() {
    const cig = useObservable(() => menu_config$)
    if (!cig) {
        return null
    }
    return (
        <div
            className={s.ContextMenu}
            onClick={() => {
                menu_config$.next(null)
            }}
        >
            <ul
                className={s.menu}
                style={{
                    left: cig.position.x + 'px',
                    top: cig.position.y + 'px',
                }}
            >
                {cig.menu_list.map((menu) => (
                    <li
                        className={s.item}
                        key={menu.key}
                        onClick={() => {
                            menu_select$.next({
                                position: cig.position,
                                payload: cig.payload,
                                menu_select: menu,
                            })
                        }}
                    >
                        {menu.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}
