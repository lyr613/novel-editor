/** 向渲染进程回复消息 */
export function reply(e: Electron.IpcMainEvent, flag: string, ...preloads: any[]) {
    e.returnValue = preloads[0]
    e.reply(flag, ...preloads)
}
