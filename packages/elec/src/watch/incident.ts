import { ipcMain } from 'electron'
import path from 'path'
import * as sio from '@/qv-io'

export function watch_incident() {
    /** 加载 incident */
    ipcMain.on('incident-find', find)
    /** 修改 */
    ipcMain.on('incident-edit', edit)
}

/**
 *
 * @param e
 * @param src 书路径
 */
function find(e: Electron.IpcMainEvent, src: string) {
    try {
        const full_src = path.join(src, 'incident.json')
        const str = sio.read_text(full_src) || '[]'
        const jsn = JSON.parse(str)
        e.returnValue = jsn
    } catch (error) {
        e.returnValue = {}
    }
}

function edit(e: Electron.IpcMainEvent, book_src: string, incident: any, be_del = false) {
    try {
        const full_src = path.join(book_src, 'incident.json')
        const str = sio.read_text(full_src) || '[]'
        let jsn: any[] = JSON.parse(str)
        if (be_del) {
            jsn = jsn.filter((v) => v.id !== incident.id)
        } else {
            const fi = jsn.findIndex((v) => v.id === incident.id)
            if (fi === -1) {
                jsn.push(incident)
            } else {
                jsn[fi] = incident
            }
        }
        const nstr = JSON.stringify(jsn)
        sio.write_text(full_src, nstr)
        e.returnValue = true
    } catch (error) {
        e.returnValue = false
    }
}
