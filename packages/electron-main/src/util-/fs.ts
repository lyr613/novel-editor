import fs from 'fs-extra'
import path from 'path'

export function effect_fs_read(src: string): fs_dto {
    try {
        const re: fs_dto = {
            b: false,
            txt: '',
        }
        if (!fs.existsSync(src)) {
            re.txt = '文件不存在'
            return re
        }
        const stat = fs.statSync(src)
        if (!stat.isFile()) {
            re.txt = '不是可读文件'
            return re
        }
        re.b = true
        re.txt = fs.readFileSync(src, 'utf-8')
        return re
    } catch (error) {
        const o: fs_dto = {
            b: false,
            txt: '未知错误',
        }
        return o
    }
}

export function effect_fs_read_json<T = any>(src: string): fs_json_dto<T> {
    try {
        const re = effect_fs_read(src)
        if (!re.b) {
            return { ...re, data: {} as any }
        }
        const data = JSON.parse(re.txt)
        const re2: fs_json_dto = {
            ...re,
            data,
        }
        return re2
    } catch (error) {
        const o: fs_json_dto = {
            b: false,
            txt: '未知错误',
            data: {},
        }
        return o
    }
}

/** 安全的创建文件夹, 出现多级缺失也可以创建, 已存在不会创建 */
export function effect_fs_mk_dir(src: string) {
    try {
        const save = []
        let it = src
        while (!fs.existsSync(it)) {
            save.push(it)
            it = path.join(it, '..')
        }
        for (let i = save.length - 1; i >= 0; i--) {
            fs.mkdirSync(save[i])
        }
    } catch (error) {}
}
