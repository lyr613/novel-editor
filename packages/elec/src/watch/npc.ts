import { ipcMain } from 'electron'
import path from 'path'
import * as sio from '@/qv-io'
import { reply } from './util'
import fs from 'fs'

export function watch_npc() {
    /** 加载npc */
    ipcMain.on('npc-list', find)
    /** 增加或编辑 */
    ipcMain.on('npc-edit', edit)
    /** 删除 */
    ipcMain.on('npc-del', edit)
    /** 出现频率 */
    ipcMain.on('npc_frequency', npc_frequency)
}

function find(e: Electron.IpcMainEvent, src: string) {
    const file_src = path.join(src, 'npc.json')
    const txt = sio.read_text(file_src) || '[]'

    try {
        const json = JSON.parse(txt)
        e.returnValue = json
    } catch (error) {
        e.returnValue = []
    }
}

function edit(e: Electron.IpcMainEvent, src: string, npc: any, be_del = false) {
    const file_src = path.join(src, 'npc.json')
    const old_txt = sio.read_text(file_src) || '[]'
    try {
        const json: any[] = JSON.parse(old_txt) || []
        const fi = json.findIndex((v) => v.id === npc.id)
        if (fi === -1) {
            // 新增
            json.push(npc)
        } else {
            if (be_del) {
                json.splice(fi, 1)
            } else {
                json.splice(fi, 1, npc)
            }
        }
        const new_txt = JSON.stringify(json)
        sio.write_text(file_src, new_txt)
        e.returnValue = true
    } catch (error) {
        e.returnValue = false
    }
}

interface appear_infor {
    position: number
    percentage: number
    node_id: string
}

interface frequency {
    names: string[]
    id: string
    appear_infors: appear_infor[]
}

/**
 * npc出现频率, 如果超过100章, 每章只要扫描到就扫描下个角色
 * @param e
 * @param book_src
 * @param npcs
 */
function npc_frequency(e: Electron.IpcMainEvent, book_src: string, cps: any[], npcs: any[]) {
    // const base_src =
    const node_id_list = get_node_list()
    const npc_use_list = get_npc_uses()
    count()
    reply(e, 'npc_frequency', npc_use_list)

    function get_node_list() {
        const re: string[] = []
        cps.forEach((cp) => {
            cp.children.forEach((node: any) => {
                re.push(node.id)
            })
        })
        return re
    }
    function get_npc_uses() {
        const re: frequency[] = npcs
            .filter((v) => (v.uneed.important || 0) > 100)
            .map((npc) => {
                const re = {
                    names: [npc.base.name],
                    id: npc.id,
                    appear_infors: [],
                }
                if (npc.uneed.alias) {
                    const als = npc.uneed.alias.split(/\s+/)
                    re.names.push(...als)
                }
                return re
            })
        return re
    }
    function count() {
        /** 已统计章节的字数 */
        let word_scan = 0
        // 先把绝对位置计算出来
        node_id_list.forEach((node_id) => {
            const src = path.join(book_src, 'chapters', node_id + '.txt')

            const txt = fs.readFileSync(src, 'utf-8')
            npc_use_list.forEach((npc) => {
                const reg = new RegExp(`(${npc.names.join('|')})`, 'g')
                const fid = txt.matchAll(reg)
                const fis = Array.from(fid)
                if (fis.length) {
                    const fi = fis[0]
                    npc.appear_infors.push({
                        node_id,
                        percentage: 0,
                        position: (fi.index || 0) + word_scan,
                    })
                }
            })
            word_scan += txt.length
        })
        // 计算百分比
        npc_use_list.forEach((npc) => {
            /** 上一个百分比, 过滤用 */
            let i = -1
            npc.appear_infors.forEach((infor) => {
                const it_percentage = ((infor.position * 100) / word_scan) | 0
                if (i === it_percentage) {
                    infor.percentage = -1
                } else {
                    infor.percentage = it_percentage
                }
                i = it_percentage
            })
            npc.appear_infors = npc.appear_infors.filter((v) => v.percentage >= 0)
        })
        return word_scan
    }
}
