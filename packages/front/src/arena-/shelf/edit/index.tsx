import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { StylePreset as gs, StyleMake as sc } from 'style-/global'
import { style as s } from './style'
import { DefaultButton, Icon, Label, Stack, TextField } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { ipc } from 'tool-/electron'
import { useObservable } from 'rxjs-hooks'
import { SubBook } from 'subject-/book'
import { shallowCopy } from 'tool-/rx-shallow-copy'
import { Rt } from 'router-'
import { SubOption } from 'subject-/option'
import { SubBookOption } from 'subject-/book-option'

/** Edit */
export default function Edit() {
    const book_src_id = useId('book_src_id')
    const bk = useObservable(() => SubBook.edit$.pipe(shallowCopy()), SubBookOption.make())
    useEffect(() => {
        return () => {
            SubBook.edit$.next(SubBookOption.make())
        }
    }, [])
    return (
        <div className={css(s.root)}>
            <section className={css(s.form)}>
                {/* 路径 */}
                <div>
                    <Label htmlFor={book_src_id}>路径</Label>
                    <Stack horizontal verticalAlign="center">
                        <TextField value={bk.src} disabled id={book_src_id} className={css(sc.wh(400))} />
                        <Icon
                            onClick={() => {
                                const src_msg: msg_dto<string> = ipc().sendSync('path_pick')
                                const src: string = src_msg.data
                                if (src) {
                                    bk.name = src.replace(/^.*[/\\]/, '')
                                }
                                bk.src = src
                                SubBook.edit$.next(bk)
                                console.log('src--', src)
                            }}
                            iconName="Settings"
                            className={css(s.iconSrcSel)}
                        ></Icon>
                    </Stack>
                </div>
                {/* 书名 */}
                <TextField
                    label="书名"
                    value={bk.name}
                    onChange={(_, ns) => {
                        bk.name = ns || ''
                        SubBook.edit$.next(bk)
                    }}
                    className={css(sc.wh(400))}
                />
                <Label>封面</Label>
                {/* 好 */}
                <DefaultButton
                    primary={true}
                    onClick={() => {
                        console.log(bk)
                        ipc().sendSync('book_add', bk)
                        // SubOption.update_shelf()
                        setTimeout(() => {
                            Rt.next('shelf')
                        }, 500)
                    }}
                >
                    好
                </DefaultButton>
                <DefaultButton
                    styles={{
                        root: {
                            marginLeft: 10,
                        },
                    }}
                    onClick={() => {
                        console.log(bk)
                        Rt.next('shelf')
                    }}
                >
                    取消
                </DefaultButton>
            </section>
        </div>
    )
}
