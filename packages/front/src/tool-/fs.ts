import { ipc } from './electron'

export function fs_read(path: string): fs_dto {
    return ipc().sendSync('fs_read', path)
}

export function fs_write(path: string, txt: string) {
    ipc().send('fs_write', path, txt)
}
export function fs_write_sync(path: string, txt: string): fs_dto {
    return ipc().sendSync('fs_write', path, txt)
}

export function fs_read_json<T>(path: string): fs_json_dto<T> {
    return ipc().sendSync('fs_read_json', path)
}

export function paths() {
    return {
        chapter_dir: 'chapter',
    }
}
