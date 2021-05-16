import pre from 'prettier'

class _he {
    json(txt0: string) {
        const txt1 = pre.format(txt0, {
            tabWidth: 4,
            parser: 'json',
        })
        return txt1
    }
}

/** 暂时用不到, 写入的时候自动格式化了 */
export const UtilPrettier = new _he()
