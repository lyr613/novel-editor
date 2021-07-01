declare type int = number
declare type float = number

type ipconfun = (e: any, ...args: any[]) => void

interface Window {
    electron: {
        ipcRenderer: {
            on: (flag: string, fun: ipconfun) => void
            once: (flag: string, fun: ipconfun) => void
            send: (flag: string, ...args: any[]) => void
            sendSync: (flag: string, ...args: any[]) => any
            removeListener: (flag: string, fun: ipconfun) => void
        }
    }
}
