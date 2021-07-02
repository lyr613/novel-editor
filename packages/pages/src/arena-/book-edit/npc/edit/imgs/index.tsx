import { StyleTheme } from 'style-/theme'
import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import { useObservable } from 'rxjs-hooks'
import { SubNpc } from 'subject-/npc'
import { Icon, IconButton } from '@fluentui/react'
import { ipc } from 'tool-/electron'
import { SubBook } from 'subject-/book'
import { shallowCopy } from 'tool-/rx-shallow-copy'
import LocalImg from 'component-/local-img'

/** Imgs */
export default function Imgs() {
    const npc = useObservable(() => SubNpc.edit$.pipe(shallowCopy()), null)
    const book = useObservable(() => SubBook.use$, null)
    if (!npc?.id || !book) {
        return null
    }
    return (
        <div className={style.Imgs}>
            <div
                className={style.Lable}
                style={{
                    backgroundColor: StyleTheme.style_vars.themeTertiary,
                }}
            >
                <span className={style.LableTxt}>头像</span>
                <IconButton
                    iconProps={{
                        iconName: 'Settings',
                    }}
                    onClick={() => {
                        const src_source = ipc().sendSync('path_pick', ['openFile']).data
                        const src_tar_re: msg_dto<any> = ipc().sendSync('path_img_will_save', {
                            type: 'npc',
                            book_id: SubBook.use_id$.value,
                            npc_id: npc.id,
                            be_head: true,
                        })
                        const src_tar = src_tar_re.data
                        if (src_source && src_tar.full) {
                            ipc().sendSync('fs_copy', src_source, src_tar.full)
                            npc.head_portrait = src_tar.base
                            SubNpc.edit$.next(npc)
                            SubNpc.save_edit()
                        }
                    }}
                ></IconButton>
            </div>
            <div className={style.ImgBox}>
                {npc.head_portrait && (
                    <LocalImg
                        src={npc.head_portrait}
                        book={book}
                        style={{
                            maxHeight: '100%',
                        }}
                    ></LocalImg>
                )}
            </div>
            <div
                className={style.Lable}
                style={{
                    backgroundColor: StyleTheme.style_vars.themeTertiary,
                }}
            >
                <span className={style.LableTxt}>立绘</span>

                <IconButton
                    iconProps={{
                        iconName: 'Add',
                    }}
                    onClick={() => {
                        const src_source = ipc().sendSync('path_pick', ['openFile']).data
                        const src_tar_re: msg_dto<any> = ipc().sendSync('path_img_will_save', {
                            type: 'npc',
                            book_id: SubBook.use_id$.value,
                            npc_id: npc.id,
                            be_head: false,
                        })
                        const src_tar = src_tar_re.data

                        if (src_source && src_tar.full) {
                            ipc().sendSync('fs_copy', src_source, src_tar.full)
                            const prev_imgs = npc.imgs || []
                            const next_imgs = [...prev_imgs, src_tar.base]
                            npc.imgs = next_imgs
                            SubNpc.edit$.next(npc)
                            SubNpc.save_edit()
                        }
                    }}
                ></IconButton>
            </div>
            <div className={style.ImgBox2}>
                {(npc.imgs || []).map((src) => (
                    <LocalImg
                        key={src}
                        src={src}
                        book={book}
                        style={{
                            marginRight: 10,
                            maxHeight: '100%',
                            flexShrink: 0,
                        }}
                    ></LocalImg>
                ))}
            </div>
        </div>
    )
}
