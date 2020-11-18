declare type int = number
declare type float = number

interface Window {
    electron: {
        ipcRenderer: {
            on: () => void
            once: () => void
            send: (flag: string, ...args: any[]) => void
            sendSync: (flag: string, ...args: any[]) => any
        }
    }
}
