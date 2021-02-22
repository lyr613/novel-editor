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

export const HelpPrettier = new _he()
