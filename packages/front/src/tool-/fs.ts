import { ipc } from './electron'

/** 工具 - 文件读写 */
export class ToolFs {
    static read(path: string): fs_dto {
        return ipc().sendSync('fs_read', path)
    }
    static write(path: string, txt: string) {
        ipc().send('fs_write', path, txt)
    }
    static write_sync(path: string, txt: string): fs_dto {
        return ipc().sendSync('fs_write', path, txt)
    }
    static read_json<T>(path: string): fs_json_dto<T> {
        return ipc().sendSync('fs_read_json', path)
    }
}
