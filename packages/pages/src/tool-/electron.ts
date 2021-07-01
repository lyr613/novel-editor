export function ipc() {
    const ir = window.electron?.ipcRenderer || {
        on() {},
        once() {},
        send() {},
        sendSync() {},
        removeListener() {},
    }
    return ir
}
