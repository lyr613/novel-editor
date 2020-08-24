import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { book_li$, find_book_li_auto, book_use_id$ } from '@/source/book'
import { shallowCopy } from '@/rx/shallow-copy'
import { TextField, Icon, DefaultButton } from 'office-ui-fabric-react'
import ThemeButton from '@/component/theme-button'
import { ipc } from '@/const/electron-help'
import ThemeLabel from '@/component/theme-label'
import { next_router } from '@/function/router'
import { editer_setting$ } from '@/subject/edit-setting'

/** List */
export default function List() {
    const list = useObservable(() => book_li$.pipe(shallowCopy()), [])
    const editer_set = useObservable(() => editer_setting$)

    return (
        <div className={css(s.root)}>
            {list.map((book) => (
                <One book={book} key={book.id} editer_set={editer_set} />
            ))}
        </div>
    )
}

function One(p: { book: book; editer_set: setting | null }) {
    const { book, editer_set } = p
    return (
        <div className={css(s.one, sc.mar(10), sc.bgclrl(6))}>
            {NameLine(book)}
            {SrcLine(book)}
            {Remote(book)}
            {ButtonBox(book, editer_set)}
            {Img(book)}
        </div>
    )
}

/** 书名行 */
function NameLine(book: book) {
    const [ipted_name, next_ipted_name] = useState('')
    const [editing_name, next_editing_name] = useState(false)
    const name_use = ipted_name.replace(/\s/g, '')
    return (
        <div className={css(s.txtline, sc.mar(0, 10), sc.wh(undefined, 36), gs.flhc)}>
            <span className={css(sc.padd(0, 10, 0, 0))}>书名: </span>
            {!editing_name ? (
                <div
                    className={css(s.hover_highlight, sc.wh(undefined, '100%'), gs.flhc, gs.pointer)}
                    onClick={() => {
                        next_ipted_name(book.name)
                        next_editing_name(true)
                    }}
                >
                    <span>{book.name || '未命名'}</span>
                    <Icon
                        iconName="Settings"
                        styles={{
                            root: {
                                paddingLeft: '5px',
                                fontSize: '16px',
                            },
                        }}
                    ></Icon>
                </div>
            ) : (
                <>
                    <TextField
                        value={ipted_name}
                        onChange={(_, ns) => {
                            ns = ns || ''
                            next_ipted_name(ns)
                        }}
                    ></TextField>
                    <ThemeButton
                        disabled={!name_use}
                        onClick={() => {
                            const b = ipc().sendSync('book_set_name', book.src, name_use)
                            if (!b) {
                                alert('修改失败')
                                return
                            }
                            find_book_li_auto()
                            next_editing_name(false)
                        }}
                    >
                        好
                    </ThemeButton>
                </>
            )}
        </div>
    )
}

/** 路径行 */
function SrcLine(book: book) {
    return (
        <div className={css(s.txtline, sc.mar(0, 10), sc.wh(undefined, 36), gs.flhc)}>
            <span className={css(sc.padd(0, 10, 0, 0))}>路径: </span>

            <div
                className={css(s.hover_highlight, sc.wh(undefined, '100%'), gs.flhc, gs.pointer)}
                onClick={() => {
                    ipc().send('fs_show', [book.src])
                }}
            >
                <span>{book.src}</span>
                <Icon
                    iconName="FabricOpenFolderHorizontal"
                    styles={{
                        root: {
                            marginLeft: '5px',
                            fontSize: '16px',
                        },
                    }}
                />
            </div>
        </div>
    )
}

/** 远程仓库 */
function Remote(book: book) {
    const [can_pull, next_can_pull] = useState(true)
    const [label, next_label] = useState('检查到远程仓库, 点此拉取更新到本地')
    const bh = 50
    useEffect(() => {
        function pull(_: any, re: any) {
            const b = re.be_suc
            const src = re.src
            if (src !== book.src) {
                return
            }
            console.log('拉取', b)
            if (b) {
                next_label('已拉取到本地')
            } else {
                next_label('拉取失败, 可能是网络问题')
            }
        }
        ipc().on('git_pull', pull)
        return () => {
            ipc().removeListener('git_pull', pull)
        }
        // eslint-disable-next-line
    }, [])
    if (!book.git) {
        return <div className={css(sc.wh(undefined, bh))}></div>
    }
    return (
        <div className={css(sc.wh(undefined, bh), sc.padd(0, 0, 0, 10), gs.flhc)}>
            <ThemeLabel
                onClick={() => {
                    if (!can_pull) {
                        return
                    }
                    ipc().send('git_pull', book.src)
                    next_label('拉取中...')
                    next_can_pull(false)
                }}
                disabled={!can_pull}
                styles={{
                    root: {
                        cursor: can_pull ? 'pointer' : '',
                    },
                }}
            >
                {label}
            </ThemeLabel>
        </div>
    )
}

/** 按钮行 */
function ButtonBox(book: book, editer_set: setting | null) {
    return (
        <div className={css(sc.padd(10))}>
            <ThemeButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('edit')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                编写
            </ThemeButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('search')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                搜索
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('outline')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                大纲
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('incident')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                事件
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('npc')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                角色
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('table')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                表格
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('map')
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                地图
            </DefaultButton>
            {editer_set?.git && (
                <DefaultButton
                    onClick={() => {
                        book_use_id$.next(book.id)
                        next_router('git')
                    }}
                    style={{
                        margin: '0 10px 10px 0',
                    }}
                >
                    仓库
                </DefaultButton>
            )}
            <DefaultButton
                onDoubleClick={() => {
                    const p = editer_setting$.value
                    p.shelf.book_list = p.shelf.book_list.filter((v) => v !== book.src)
                    editer_setting$.next(p)
                    find_book_li_auto()
                }}
                style={{
                    margin: '0 10px 10px 0',
                }}
            >
                隐藏
            </DefaultButton>
        </div>
    )
}

/** 预览图 */
function Img(book: book) {
    return (
        <div
            className={css(gs.hoverfocu)}
            onClick={() => {
                ipc().sendSync('book_set_cover', book.src)
            }}
        >
            {book.cover ? (
                <img
                    src={book.cover}
                    className={css(sc.pos('absolute', 0, undefined, undefined, 0), sc.wh(undefined, '100%'))}
                    alt=""
                />
            ) : (
                <div className={css(sc.pos('absolute', 0, undefined, undefined, 0), sc.wh(120, '100%'), sc.bgclrl(5))}>
                    <span className={css(sc.pos('absolute', '10px', '5%'), sc.wh('90%'), sc.fts(14))}>
                        点击此处打开文件夹, 将封面图片命名为 preview 放到打开的文件夹内
                    </span>
                </div>
            )}
        </div>
    )
}
