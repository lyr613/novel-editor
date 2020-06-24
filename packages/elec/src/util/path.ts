import fs from 'fs'
/** 检查是否有此路径, 没有则抛出错误 */
export function check_exist_path(src: string) {
    if (!src) {
        throw '路径为空'
    }
    if (!fs.existsSync(src)) {
        throw '没有此路径'
    }
    return true
}
