import { createHashHistory } from 'history'

let prev_router = '-1'

/** 1级路由表 */
export const ROUTERL1 = {
    shelf: '书架',
    chapter: '章节',
    edit: '编写',
    search: '搜索',
    help: '帮助',
    npc: '角色',
    table: '设定',
    outline: '大纲',
    incident: '事件',
    git: '史诗',
    map: '地图',
    option: '设置',
    zip: '归档',
    statistics: '统计',
}
export const ROUTERL2 = {
    edit: {
        /** 编辑章节 */
        chapter_set: 'chapter-set',
    },
}

/** 一级路由 */
export type router_l1 = keyof typeof ROUTERL1

/** 下一个路由 */
export function next_router(router: router_l1, ...rest: string[]) {
    const p = createHashHistory()
    const full = '/' + router + hand_rest()

    if (full === prev_router) {
        return
    }
    p.push(full)
    prev_router = full

    function hand_rest() {
        if (!rest.length) {
            return ''
        }
        return '/' + rest.join('/')
    }
}
