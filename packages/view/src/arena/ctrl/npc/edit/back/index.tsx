import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { DefaultButton } from 'office-ui-fabric-react'
import { next_router } from '@/router/router'
import { edit_2_npc$ } from '@/subject/go-to'
import { take } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'

/** Back */
export default function Back() {
    const from_edit = useObservable(() => edit_2_npc$.pipe(take(1)))
    return (
        <div className={css(s.root)}>
            <DefaultButton
                onClick={() => {
                    next_router('npc')
                }}
                styles={{
                    root: {
                        margin: '10px 0 10px 10px',
                    },
                }}
            >
                返回
            </DefaultButton>
            {from_edit && (
                <DefaultButton
                    onClick={() => {
                        next_router('edit')
                    }}
                    styles={{
                        root: {
                            margin: '10px 0 10px 10px',
                        },
                    }}
                >
                    返回编辑页
                </DefaultButton>
            )}
        </div>
    )
}
