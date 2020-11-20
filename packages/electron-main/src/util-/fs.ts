import fs from 'fs-extra'

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

export function effect_fs_read_json(src: string): fs_json_dto {
    try {
        const re = effect_fs_read(src)
        if (!re.b) {
            return { ...re, data: {} }
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
