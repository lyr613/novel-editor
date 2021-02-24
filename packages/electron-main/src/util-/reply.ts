/** 向渲染进程回复消息 */
export function reply(e: Electron.IpcMainEvent, flag: string, ...preloads: any[]) {
    e.returnValue = preloads[0]
    e.reply(flag, ...preloads)
}

class _ur {
    reply(e: Electron.IpcMainEvent, flag: string, preload: msg_dto) {
        e.returnValue = preload
        e.reply(flag, preload)
    }
    /** 优先产生错误 */
    msg<T>(data: T): msg_dto<T> {
        return {
            b: false,
            txt: '未知错误',
            data,
        }
    }
}

export const UtilReply = new _ur()
