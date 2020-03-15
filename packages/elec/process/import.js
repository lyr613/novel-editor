const fs = require('fs')
const path = require('path')

// 导入

process.on('message', ([file_src, dir_src, reg]) => {
    impt(file_src, dir_src, reg)
})

function id32() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
}

function impt(file_src, dir_src, reg) {
    reg = reg || `^\\s*第.+章\\s`
    const regx = new RegExp(reg)
    //
    const txt = fs.readFileSync(file_src, 'utf-8')
    const lines = txt.split(/\r?\n/)
    const mch = lines.filter((s) => regx.test(s))

    process.send(['import_txt_step', `解析文本, 共${mch.length}章`])

    //
    if (mch.length === 0) {
        process.send(['import_txt_step', `不能解析此文本`])
        return
    }

    fs.mkdirSync(path.join(dir_src, 'chapters'))
    const chapter = {
        id: id32(),
        name: '导入',
        expand: true,
        hidden: false,
        children: [],
    }
    //
    let node_id = id32()
    let node_src = ''
    let did_node_count = 0
    lines.forEach((line, i) => {
        line = line.trim()
        if (line.replace(/\s/g, '').length === 0) {
            return
        }
        if (regx.test(line)) {
            did_node_count++
            if (did_node_count % 100 === 0) {
                process.send(['import_txt_step', `已导入${did_node_count}章`])
            }
            node_id = id32()
            const node = {
                chapter_id: chapter.id,
                hidden: false,
                id: node_id,
                name: line,
            }
            chapter.children.push(node)
            node_src = path.join(dir_src, 'chapters', node_id + '.txt')
            fs.writeFileSync(node_src, '')
        } else {
            if (node_src) {
                fs.appendFileSync(node_src, '    ' + line + '\n\n')
            }
        }
    })
    process.send(['import_txt_step', `生成章节索引`])
    fs.writeFileSync(path.join(dir_src, 'chapter.json'), JSON.stringify([chapter]))

    process.send(['import_txt_step', `导入完毕`])
    process.send(['import_txt_step', `end:${dir_src}`])

    process.send(['import_txt_end', `导入完毕`])
}
