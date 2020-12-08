import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style-/global'
import { style as s } from './style'
import { Icon, Label, Stack, TextField } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import { ipc } from 'tool-/electron'
/** Edit */
export default function Edit() {
    const book_src_id = useId('book_src_id')
    return (
        <div className={css(s.root)}>
            <section className={css(s.form)}>
                <div>
                    <Label htmlFor={book_src_id}>路径</Label>
                    <Stack horizontal verticalAlign="center">
                        <TextField
                            id={book_src_id}
                            onClick={() => {
                                console.log(234567)
                            }}
                            className={css(sc.wh(400))}
                        />
                        <Icon
                            onClick={() => {
                                const src = ipc().sendSync('path_pick')
                                console.log('src--', src)
                            }}
                            iconName="Settings"
                            className={css(s.iconSrcSel)}
                        ></Icon>
                    </Stack>
                </div>
                <TextField label="书名" className={css(sc.wh(400))} />
                <Label>封面</Label>
            </section>
        </div>
    )
}
