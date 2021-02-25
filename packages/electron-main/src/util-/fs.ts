import fs from 'fs-extra'
import path from 'path'
import { UtilReply } from './reply'
import prettier from 'prettier'

class _f {
    read(src: string) {
        const msg = UtilReply.msg('')
        try {
            if (!fs.existsSync(src)) {
                msg.txt = '文件不存在'
                return msg
            }
            const stat = fs.statSync(src)
            if (!stat.isFile()) {
                msg.txt = '不是可读文件'
                return msg
            }
            msg.b = true
            msg.data = fs.readFileSync(src, 'utf-8')
            return msg
        } catch (error) {
            return msg
        }
    }
    read_json<T = any>(src: string): msg_dto<T | null> {
        const red = this.read(src)
        const re = UtilReply.msg(null as null | T)
        re.b = red.b
        re.txt = red.txt

        if (!re.b) {
            return re
        }
        try {
            const data: T = JSON.parse(red.data)
            re.data = data

            return re
        } catch (error) {
            re.b = false
            re.txt = src + ',json解析错误'
            return re
        }
    }
    /** 写文件, json会自动格式化 */
    write(src: string, txt: string) {
        const msg = UtilReply.msg(null)
        // 尝试对json格式化
        try {
            const extname = path.extname(src)
            if (extname === '.json') {
                txt = prettier.format(txt, {
                    parser: 'json',
                })
            }
        } catch (error) {
            msg.txt = 'json格式化错误'
            return msg
        }
        try {
            fs.writeFileSync(src, txt)
            msg.b = true
            return msg
        } catch (error) {
            msg.txt = '写入失败'
            return msg
        }
    }
    /** 安全的创建文件夹, 出现多级缺失也可以创建, 已存在不会创建 */
    mk_dir(src: string) {
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
}

export const UtilFs = new _f()
