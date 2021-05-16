class _ur {
    /** 向渲染进程回复消息 */
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
