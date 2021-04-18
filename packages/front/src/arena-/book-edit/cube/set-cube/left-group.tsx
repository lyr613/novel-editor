import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { StyleComp } from 'style-/comp'
import { useObservable } from 'rxjs-hooks'
import { SubCube } from 'subject-/cube'
import { _cube_set2 } from './subj'
import { IconButton, Stack } from '@fluentui/react'
import { BookEditCube } from '../sub'
import { StyleTheme } from 'style-/theme'

/** LeftGroup */
export default function LeftGroup() {
    const li = useObservable(() => SubCube.li$, [])
    const selm = useObservable(() => _cube_set2.seled_l1_map$, new Map())

    return (
        <div className={css(s.LeftGroup)}>
            <Stack
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: 40,
                    borderBottom: `1px solid ${StyleTheme.style_vars.themePrimary}`,
                    boxSizing: 'border-box',
                    paddingLeft: 5,
                }}
                horizontal
                verticalAlign="center"
            >
                <IconButton
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={() => {
                        BookEditCube.show_type$.next('icon')
                    }}
                ></IconButton>
            </Stack>
            {li.map((cube, i) => (
                <CubeGroupItem key={cube.id} group={cube} sel_map={selm} index={i} />
            ))}
        </div>
    )
}

interface p {
    sel_map: Map<string, boolean>
    index: number
    group: cube_group_vo
}
function CubeGroupItem(p: p) {
    const high_light = p.sel_map.get(p.group.id)

    return (
        <div
            className={css(s.CubeGroupItem, StyleComp.select_item.item, high_light ? StyleComp.select_item.high : null)}
            onClick={(e) => {
                _cube_set2.click_l1(e, p.group.id)
            }}
        >
            {p.group.name}
        </div>
    )
}
