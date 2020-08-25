import { npc_li$ } from '../npc'

export function mk_npc_reg(li?: npc[]) {
    li = li || npc_li$.value
    const reg = new RegExp(`(${li.map((v) => v.base.name).join('|')})`)
    return reg
}
