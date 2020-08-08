// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { theme_colors, editer_setting$ } from '@/subject'

interface p {
    add_class?: string[]
}

export default function ThemeButton(p: IButtonProps & p) {
    const eset = useObservable(() => editer_setting$)
    const theme = eset?.common.theme ?? 'word'
    const clrs = theme_colors
    const clas = [...(p.add_class || []), p.className].join(' ')
    return (
        <PrimaryButton
            {...p}
            className={clas}
            styles={{
                root: {
                    backgroundColor: clrs[theme][4],
                    borderColor: clrs[theme][4],
                },
                rootHovered: {
                    backgroundColor: clrs[theme][3],
                    borderColor: clrs[theme][3],
                },
                rootChecked: {
                    backgroundColor: clrs[theme][3],
                    borderColor: clrs[theme][3],
                },
                rootPressed: {
                    backgroundColor: clrs[theme][3],
                    borderColor: clrs[theme][3],
                },
            }}
        ></PrimaryButton>
    )
}
