import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { StyleComp } from 'style-/comp'
import { useObservable } from 'rxjs-hooks'
import { SubCube } from 'subject-/cube'
import { _cube_set } from './subj'

/** LeftGroup */
export default function LeftGroup() {
    const li = useObservable(() => SubCube.li$, [])
    const seled = useObservable(() => _cube_set.seled_l1$, [-1, -1])
    const min = Math.min(...seled)
    const max = Math.max(...seled)
    return (
        <div className={css(s.LeftGroup)}>
            {li.map((cube, i) => (
                <CubeBoxItem key={cube.id} cube={cube} mini={min} maxi={max} index={i} />
            ))}
        </div>
    )
}

interface p {
    mini: number
    maxi: number
    index: number
    cube: cube_group_vo
}
function CubeBoxItem(p: p) {
    const high_light = p.mini <= p.index && p.index <= p.maxi

    return (
        <div
            className={css(s.CubeBoxItem, StyleComp.select_item.item, high_light ? StyleComp.select_item.high : null)}
            onClick={(e) => {
                // console.log(e)
                _cube_set.seled_l2$.next([-1, -1])

                _cube_set.now_sel$.next('l1')
                const sh = e.shiftKey
                if (!sh) {
                    _cube_set.seled_l1$.next([p.index, p.index])
                    return
                }

                const n2 = _cube_set.seled_l1$.value
                // console.log(...n2)

                const diff0 = Math.abs(n2[0] - p.index)
                const diff1 = Math.abs(n2[1] - p.index)
                if (diff0 > diff1) {
                    _cube_set.seled_l1$.next([n2[0], p.index])
                } else {
                    _cube_set.seled_l1$.next([n2[1], p.index])
                }
            }}
        >
            {p.cube.name}
        </div>
    )
}
