/** 防止网页打开没有electron */
export function electron(): Electron.CommonInterface {
    if (window.electron) {
        return window.electron
    }
    return {
        ipcRenderer: {
            send() {},
            sendSync() {},
            on() {},
            once() {},
        },
        // 这里设置一下用来帮助检测运行环境, 旁边的env.ts
        CommandLine: 'web',
    } as any
}

/** 因为只用到了ipcRenderer */
export function ipc() {
    return electron().ipcRenderer
}
