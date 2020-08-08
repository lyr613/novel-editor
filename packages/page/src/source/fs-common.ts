import { ipc } from '@/util/electron-help'

/**
 * 读文件, json自动解析
 * @param type
 * @param srcs
 * @param inset
 */
export function fs_read<T = string>(type: 'txt' | 'json', srcs: string[], hand?: (s: string | Object) => T) {
    try {
        const re = ipc().sendSync('fs_read', type, srcs)
        if (hand) {
            return hand(re)
        }
        return re as T
    } catch (error) {
        return null
    }
}
/**
 * 同步写文件
 * 使用的时候自动检查空路径(抛出错误)
 * @param type
 * @param srcs
 * @param inset
 */
export function fs_write(type: 'txt' | 'json', srcs: string[], inset: string | Object): boolean {
    if (typeof inset !== 'string') {
        inset = JSON.stringify(inset)
    }
    const b = ipc().sendSync('fs_write', type, srcs, inset)
    return b
}

/**
 * 新建文件夹
 * 使用的时候自动检查空路径
 * @param srcs
 */
export function mk_dir(srcs: string[]): boolean {
    // ipc().send('mk_dir', srcs)
    // return new Promise(res => {
    // 	ipc().once('mk_dir', (_, b) => {
    // 		res(b)
    // 	})
    // })
    return ipc().sendSync('mk_dir', srcs)
}
/**
 * 重命名文件夹
 * @param srcs
 */
export function fs_rename(old_srcs: string[], new_srcs: string[]): boolean {
    return ipc().sendSync('fs_rename', old_srcs, new_srcs)
    // return new Promise(res => {
    // 	ipc().once('fs_rename', (_, b) => {
    // 		res(b)
    // 	})
    // })
}

/** 选择 文件夹
 * 不可以用同步,mac上有bug, 创建文件夹无法结束事件
 */
export function select_dir(): Promise<{
    /** 路径 */
    src: string
    /** 是否为空文件夹 */
    empty: boolean
}> {
    return new Promise((suc) => {
        ipc().send('fs_choose_dir')
        ipc().once('fs_choose_dir', (_, re) => {
            suc(re)
        })
    })
}
/** 选择 文件 */
export function select_file(): Promise<string> {
    return new Promise((suc) => {
        ipc().send('fs_choose_file')
        ipc().once('fs_choose_file', (_, re) => {
            suc(re)
        })
    })
}
