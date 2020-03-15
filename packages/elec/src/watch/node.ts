import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'
import * as sio from '@/qv-io'

export function watch_node() {
    /** 加载节点的文本 */
    ipcMain.on('node-text-find', (e, src: string) => {
        try {
            const text = sio.read_text(src)
            e.reply('node-text-find', text)
            e.returnValue = text
        } catch (error) {
            const re = '加载失败, ctrl(command) + r重试'
            e.reply('node-text-find', re)
            e.returnValue = re
        }
    })
    /** 储存节点的文本 */
    ipcMain.on('node-text-save', (e, src: string, text: string) => {
        try {
            sio.write_text(src, text)
            e.reply('node-text-save-end', true)
        } catch (error) {}
    })
}
