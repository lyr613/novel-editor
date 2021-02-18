import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style-/global'
import { style as s } from './style'
import { DefaultButton, Icon, Label, Stack, TextField } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { ipc } from 'tool-/electron'
import { useObservable } from 'rxjs-hooks'
import { SubBook } from 'subject-/book'
import { shallowCopy } from 'tool-/rx-shallow-copy'

/** Edit */
export default function Edit() {
    const book_src_id = useId('book_src_id')
    const bk = useObservable(() => SubBook.edit$.pipe(shallowCopy()), SubBook.make())
    useEffect(() => {
        return () => {
            SubBook.edit$.next(SubBook.make())
        }
    }, [])
    return (
        <div className={css(s.root)}>
            <section className={css(s.form)}>
                {/* 路径 */}
                <div>
                    <Label htmlFor={book_src_id}>路径</Label>
                    <Stack horizontal verticalAlign="center">
                        <TextField
                            value={bk.src}
                            disabled
                            id={book_src_id}
                            onClick={() => {
                                console.log(234567)
                            }}
                            className={css(sc.wh(400))}
                        />
                        <Icon
                            onClick={() => {
                                const src: string = ipc().sendSync('path_pick')
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
                    }}
                >
                    好
                </DefaultButton>
            </section>
        </div>
    )
}
