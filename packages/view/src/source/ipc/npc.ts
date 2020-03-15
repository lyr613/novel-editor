import { ipc } from '@/const'

/** 查找节点的文本内容 */
export function npc_find_ipc(src: string): Promise<npc[]> {
    return new Promise((res) => {
        const re = ipc().sendSync('npc-list', src)
        res(re)
    })
}
