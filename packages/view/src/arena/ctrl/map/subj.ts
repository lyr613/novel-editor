import { BehaviorSubject, Subject } from 'rxjs'
import { id32 } from '@/function/id32'
import { switchMap, map, throttleTime } from 'rxjs/operators'
import { fs_read, book_use$ } from '@/source'

/** 点的位置, 千分比整数 */
export interface point_ {
    x: number
    y: number
}

export interface pen_ {
    type: 'pen'
    id: string
    color: string
    points: point_[]
}
export function of_pen(): pen_ {
    return {
        type: 'pen',
        id: id32(),
        color: 'ff0000',
        points: [],
    }
}

export interface map_txt {
    id: string
    color: string
    txt: string
    description: string
    position: point_
    /** 链接地图的id */
    linkid: string
}
export function of_txt(): map_txt {
    return {
        id: id32(),
        color: 'red',
        txt: '',
        description: '',
        position: {
            x: 50,
            y: 50,
        },
        /** 链接地图的id */
        linkid: '',
    }
}
/** 正在编辑的链接 */
export const map_txt_buffer$ = new BehaviorSubject(of_txt())

export interface amap {
    id: string
    name: string
    /** 自由绘制线s */
    pens: pen_[]
    /** 文字 */
    txts: map_txt[]
}
/** 地图列表 */
export const map_list$ = new BehaviorSubject<amap[]>([])

/** 在聚焦地图的id */
export const map_focu_id$ = new BehaviorSubject('')

/**
 * 聚焦的地图
 * 不要直接改变他, 通过改变id来自动更换
 */
export const map_focu$ = new BehaviorSubject<undefined | amap>(undefined)
// 自动更新聚焦地图
map_list$
    .pipe(
        switchMap((arr) => {
            return map_focu_id$.pipe(map((id) => arr.find((v) => v.id === id)))
        }),
    )
    .subscribe((x) => {
        map_focu$.next(x)
    })

export function of_map(): amap {
    return {
        id: id32(),
        name: '地图名称',
        pens: [],
        txts: [],
    }
}

/** 一次绘制的点集 */
export const one_draw_buffer$ = new BehaviorSubject<point_[]>([])

/**
 * 一张图
 *      可点击位置
 *      文字
 *      线条
 */

/** 处于编辑模式 */
export const be_editing$ = new BehaviorSubject(false)

/** 处于画线模式, false: 链接模式 */
export const be_drawing$ = new BehaviorSubject(true)

/** 处于选择地图模式(提供给链接) */
export const be_selecting$ = new BehaviorSubject(false)

/** 查找地图列表 */
export const map_list_find$ = new Subject()

/** 底部设置的颜色
 * 在保存时直接取用这个值去覆盖就好了
 */
export const map_foo_color$ = new BehaviorSubject('ff0000')

map_list_find$.pipe(throttleTime(2000)).subscribe(() => {
    const bs = book_use$.value?.src
    if (!bs) {
        return
    }
    const re = fs_read<amap[] | null>('json', [bs, 'map.json'])
    if (!re) {
        return
    }
    map_list$.next(re)
})
