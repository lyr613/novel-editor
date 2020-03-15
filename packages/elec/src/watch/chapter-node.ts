import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import * as sio from '@/qv-io'
import { REGS } from '@/const'
import { id32 } from './util'

export function watch_chapter_node() {
    /** 由书目路径获取章节列表 */
    ipcMain.on('chapter-node-list', find)
    /** 新章 */
    ipcMain.on('chapter-new', add_chapter)
    /** 重命名章 */
    ipcMain.on('chapter-rename', rename)
    /** 新节 */
    ipcMain.on('node-new', add_node)
    /** 重命名节 */
    ipcMain.on('node-rename', rename)
}

/**
 * 添加新章
 * @param e
 * @param p_src 上层路径(书)
 * @param order 章序号, 整10
 */
function add_chapter(e: Electron.IpcMainEvent, p_src: string, order: number) {
    try {
        const id = id32()
        const src = path.join(p_src, `${order}##新章##${id}`)
        fs.mkdirSync(src)
        e.returnValue = true
    } catch (error) {
        e.returnValue = false
    }
}
/**
 * 添加新节
 * @param e
 * @param p_src 上层路径(章)
 * @param order 节序号, 整10
 */
function add_node(e: Electron.IpcMainEvent, p_src: string, order: number) {
    try {
        const id = id32()
        const src = path.join(p_src, `${order}##新节##${id}.txt`)
        sio.write_text(src, '')
        e.returnValue = true
    } catch (error) {
        e.returnValue = false
    }
}

/**
 * 查找章节列表
 * @param e
 * @param src 书目路径
 */
function find(e: Electron.IpcMainEvent, src: string) {
    try {
        const tower = sio.build_tower(src)
        tower.shift()
        const cn = (tower[0] || [])
            .filter((dir) => {
                const name = path.basename(dir.full_path)
                return REGS.chapter_name.test(name) && sio.be_dir(dir.full_path)
            })
            .map((df) => {
                const dir = df as sio.dir
                const basename = path.basename(dir.full_path)
                const naarr = basename.split('##')

                return {
                    order: naarr[0],
                    name: naarr[1],
                    id: naarr[2],
                    path: dir.full_path,
                    children: find_node(dir.children),
                }
            })

        e.reply('chapter-node-list', cn)
        e.returnValue = cn
    } catch (error) {
        e.reply('chapter-node-list', [])
        e.returnValue = []
    }
    function find_node(fis: (sio.file | sio.dir)[]) {
        const re = fis
            .filter((fi) => {
                if (!sio.be_file(fi.full_path)) {
                    return false
                }
                const basename = path.basename(fi.full_path)
                return REGS.node_name.test(basename)
            })
            .map((df) => {
                const fi = df as sio.file
                const basename = path.basename(fi.full_path)
                const naarr = basename.split('##')

                return {
                    order: naarr[0],
                    name: naarr[1],
                    id: naarr[2],
                    path: fi.full_path,
                }
            })
        return re
    }
}

/**
 * 重命名
 * @param e
 * @param src 章/节路径
 * @param name 新名字
 */
function rename(e: Electron.IpcMainEvent, src: string, name: string) {
    try {
        const old = path.basename(src)
        const arr = old.split('##')
        arr[1] = name
        const name2 = arr.join('##')
        const src2 = path.join(src, '..', name2)
        fs.renameSync(src, src2)
        e.returnValue = true
    } catch (error) {
        e.returnValue = false
    }
}
