import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style-/global'
import { style as s } from './style'
import { fromEvent, Subject } from 'rxjs'
import { mk_router, next_router } from 'router-/pusher'
import { router1, router2_shelf } from 'router-/define'
import { ipc } from 'tool-/electron'
import { Icon } from '@fluentui/react/lib/Icon'

/** MenuBar */
export default function MenuBar() {
    const menus: menu_vo[] = [
        {
            name: '书架',
            children: [
                {
                    name: '查看',
                    click() {
                        next_router('shelf')
                        menu_use$.next('')
                    },
                },
                {
                    name: '新书',
                    click() {
                        next_router('shelf', router2_shelf().new.en)
                        menu_use$.next('')
                    },
                },
            ],
        },
        {
            name: '编辑',
            children: [
                {
                    name: '目录',
                    click() {},
                },
                {
                    name: '文本',
                    click() {},
                },
            ],
        },
        {
            name: '设置',
            click() {
                const rt = mk_router('option')
                next_router('option')
                menu_use$.next('')
            },
            children: [],
        },
    ]
    useEffect(() => {
        const ob1 = fromEvent(document, 'click').subscribe(() => {
            menu_use$.next('')
        })
        return () => {
            ob1.unsubscribe()
        }
    }, [])
    return (
        <div className={css(s.MenuBar)}>
            {menus.map((menu) => (
                <MenuItem key={menu.name} menu={menu} />
            ))}
            <Right />
        </div>
    )
}

/** 打开的菜单, name */
const menu_use$ = new Subject<string>()

interface menu_vo {
    name: string
    click?: () => void
    children: {
        name: string
        click?: () => void
    }[]
}

interface menu_item {
    menu: menu_vo
}
function MenuItem(p: menu_item) {
    const [be_useing, next_be_useing] = useState(false)
    const [cur_menu, next_cur_menu] = useState('')
    useEffect(() => {
        const ob2 = menu_use$.subscribe((nm) => {
            next_be_useing(nm === p.menu.name)
            next_cur_menu(nm)
        })
        return () => {
            ob2.unsubscribe()
        }
    }, [p])

    return (
        <div
            className={css(s.MenuItem, be_useing ? s.MenuItemUse : undefined)}
            onClick={(e) => {
                e.stopPropagation()
                menu_use$.next(p.menu.name)
                if (p.menu.click) {
                    p.menu.click()
                }
            }}
            onMouseMove={() => {
                if (cur_menu) {
                    menu_use$.next(p.menu.name)
                }
            }}
        >
            {p.menu.name}
            {be_useing && (
                <div
                    className={css(s.MenuExtend)}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    {p.menu.children.map((cld) => (
                        <div key={p.menu.name + cld.name} className={css(s.MenuExtendItem)} onClick={cld.click}>
                            {cld.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function Right() {
    useEffect(() => {}, [])
    return (
        <div className={css(s.Right)}>
            <div
                className={css(s.IconBox)}
                onClick={() => {
                    ipc().send('window_min')
                }}
            >
                <Icon iconName="ChromeMinimize" />
            </div>
            <div
                className={css(s.IconBox)}
                onClick={() => {
                    ipc().send('window_max')
                }}
            >
                <Icon iconName="ChromeRestore" />
            </div>
            <div
                className={css(s.IconBox, s.IconBoxDanger)}
                onClick={() => {
                    ipc().send('window_close')
                }}
            >
                <Icon iconName="ChromeClose" />
            </div>
        </div>
    )
}
