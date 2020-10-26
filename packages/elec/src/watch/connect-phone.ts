import { ipcMain, screen } from 'electron'
import path from 'path'
import http from 'http'
import os from 'os'
import { reply } from './util'
import fs from 'fs-extra'
import { get_main_window } from '@/util/main-window'
import SocketIOStatic from 'socket.io'
import detect from 'detect-port'

class SocketIt {
    /** app客户端 */
    app_client: null | SocketIOStatic.Socket = null
    /** 页面客户端 */
    page_client: null | SocketIOStatic.Socket = null
    /** http服务端, 用不到 */
    http_server: null | http.Server = null
    /** socket服务端 */
    socket_server: null | SocketIOStatic.Server = null
    /** 使用的端口 */
    port_use: null | number = null

    /** 初始化服务端 */
    async init_server() {
        if (this.socket_server) {
            return
        }
        const http_server = this.http_server || http.createServer()
        this.http_server = http_server
        const socket_server = SocketIOStatic(this.http_server)
        this.socket_server = socket_server
        this.socket_server.on('connection', (client) => {
            client.on('set_it_app', () => {
                this.app_client = client
                console.log('设置app客户端')
            })
            client.on('set_it_page', () => {
                this.page_client = client
                console.log('设置app客户端')
            })
        })
        const suggest_port = await detect(7101)
        this.port_use = suggest_port
        console.log('使用此端口建立socket', suggest_port)
        http_server.listen(suggest_port)
    }
    get_socket_src() {
        if (this.port_use === null) {
            return ''
        }
        const ip = get_ip()
        if (ip === false) {
            return ''
        }
        return `http://${ip}:${this.port_use}`
    }
}

const socket_it = new SocketIt()

export function watch_connect_phone() {
    /** 获取socket连接地址, 可能为空字符串 */
    ipcMain.on('phone_socket_src', phone_socket_src)
}

/** 获取socket连接地址, 可能为空字符串 */
async function phone_socket_src(e: Electron.IpcMainEvent) {
    await socket_it.init_server()
    const src = socket_it.get_socket_src()
    reply(e, 'phone_socket_src', src)
}

/**
 * 获取wlan ip, 失败返回false
 */
function get_ip() {
    const inters = os.networkInterfaces()
    const wlan = inters.WLAN || []
    // console.log(wlan)

    const f = wlan.find((v) => {
        if (v.family !== 'IPv4') {
            return false
        }
        if (v.internal !== false) {
            return false
        }
        if (v.address === '127.0.0.1') {
            return false
        }
        return true
    })
    // console.log(f)

    if (!f) {
        return false
    }
    return f.address
}
