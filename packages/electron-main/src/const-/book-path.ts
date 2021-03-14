import path from 'path'

class _s {
    /** option.json 书目信息 */
    get option() {
        return 'option.json'
    }
    /** volume.json 卷章信息 */
    get volume() {
        return 'volume.json'
    }
    /** volume 卷章文本文件夹 */
    get vol_dir() {
        return 'volume'
    }
    get npc() {
        return 'npc.json'
    }
    /** 数据立方体, 方便一些数据流的 */
    get npc_cube() {
        return 'npc-cube.json'
    }
    /** 拼接json文件的完整路径 */
    full_src(book_src: string, json_file: json_file) {
        const f = (this as any)[json_file]
        return path.join(book_src, f)
    }
}

type json_file = 'option' | 'volume' | 'npc' | 'npc_cube'

/** 书目内部路径 */
export const ConstBookPath = new _s()
