// 归档
import { ipcMain, shell, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply, id32 } from './util'
import cp from 'child_process'
import { ENV } from '@/const'
import { get_chapters } from '@/func/fs'

export function watch_zip() {
    // 导入文件内容
    ipcMain.on('import_txt', import_txt)
    // 导出文件内容
    ipcMain.on('export_txt', export_txt)
    // 导入git仓库
    ipcMain.on('import_git', import_git)
}

/**
 * 读取文件内容
 * @param e
 * @param file_src txt文件路径
 * @param dir_src 存放路径
 * @param reg 传来字符串, 这里构造正则
 * @returns 成功: 文本或obj, 失败: null
 */
function import_txt(e: Electron.IpcMainEvent, file_src: string, dir_src: string, reg: string) {
    try {
        // reg = reg || `^\\s*第.+章\\s`
        // const regx = new RegExp(reg)
        reply(e, 'import_txt_step', `开始导入 ${path.basename(dir_src)}`)
        const fsrc = path.resolve(ENV.app_path, 'process', 'import.js')
        const cf = cp.fork(fsrc)
        cf.send([file_src, dir_src, reg])
        cf.on('message', (msg: any[]) => {
            ;(reply as any)(e, ...msg)
        })
        cf.on('error', (err) => {
            console.log(err)
        })

        // const txt = fs.readFileSync(file_src, 'utf-8')
        // const lines = txt.split(/\r?\n/)
        // const mch = lines.filter((s) => regx.test(s))
        // reply(e, 'import_txt_step', `解析文本, 共${mch.length}章`)
        // if (mch.length === 0) {
        //     reply(e, 'import_txt_step', `不能解析此文本`)
        //     return
        // }
        // fs.mkdirSync(path.join(dir_src, 'chapters'))
        // const chapter = {
        //     id: id32(),
        //     name: '导入',
        //     expand: true,
        //     hidden: false,
        //     children: [] as any[],
        // }
        // let node_id = id32()
        // let node_src = ''
        // let did_node_count = 0
        // lines.forEach((line, i) => {
        //     line = line.trim()
        //     if (line.replace(/\s/g, '').length === 0) {
        //         return
        //     }
        //     if (regx.test(line)) {
        //         did_node_count++
        //         if (did_node_count % 100 === 0) {
        //             reply(e, 'import_txt_step', `已导入${did_node_count}章`)
        //         }
        //         node_id = id32()
        //         const node = {
        //             chapter_id: chapter.id,
        //             hidden: false,
        //             id: node_id,
        //             name: line,
        //         }
        //         chapter.children.push(node)
        //         node_src = path.join(dir_src, 'chapters', node_id + '.txt')
        //         fs.writeFileSync(node_src, '')
        //     } else {
        //         if (node_src) {
        //             fs.appendFileSync(node_src, '    ' + line + '\n\n')
        //         }
        //     }
        // })
        // reply(e, 'import_txt_step', `生成章节索引`)
        // fs.writeFileSync(path.join(dir_src, 'chapter.json'), JSON.stringify([chapter]))
        // reply(e, 'import_txt_step', `导入完毕`)
        // reply(e, 'import_txt_step', `end:${dir_src}`)

        // reply(e, 'import_txt_end', `导入完毕`)
    } catch (_) {
        reply(e, 'import_txt', false)
    }
}

/**
 * 导出txt文件
 * @param e
 * @param book_src
 * @param export_src
 */
function export_txt(e: Electron.IpcMainEvent, book_src: string, export_src: string) {
    try {
        const cps = get_chapters(book_src)
        let export_txt_src = path.join(export_src, path.basename(book_src))
        let i = 0
        while (fs.existsSync(export_txt_src + i + '.txt')) {
            i++
        }
        export_txt_src = export_txt_src + i + '.txt'

        let did_count = 0

        cps.forEach((cp) => {
            cp.children.forEach((node: any) => {
                did_count++
                try {
                    let title = `${node.name}\n\n`
                    if (!title.match(/^第.+章/)) {
                        title = `第${did_count}章 ` + title
                    }
                    const node_src = path.join(book_src, 'chapters', node.id + '.txt')
                    const toadd = title + fs.readFileSync(node_src, 'utf-8') + '\n\n'
                    fs.appendFileSync(export_txt_src, toadd)
                    if (did_count % 100 === 0) {
                        reply(e, 'export_txt_step', `已导出${did_count}章`)
                    }
                } catch (error) {
                    reply(e, 'export_txt_step', `第${did_count}章 ${node.name} 导出失败 ${node.id}`)
                }
            })
        })
        reply(e, 'export_txt_step', '导出完毕')
    } catch (error) {}
}

/**
 * 读取文件内容
 * @param e
 * @param git_src 仓库地址
 * @param dir_src 存放路径
 * @returns 成功: 文本或obj, 失败: null
 */
function import_git(e: Electron.IpcMainEvent, git_src: string, dir_src: string) {
    try {
        reply(e, 'import_git_step', '开始从git仓库导入')

        cp.exec(
            `git clone ${git_src}`,
            {
                cwd: dir_src,
            },
            (err, out) => {
                console.log('err', err)
                console.log('out', out)
                if (err) {
                    throw 'git仓库下载失败'
                }
                reply(e, 'import_git_step', '从远程仓库下载成功')
                reply(e, 'import_git_step', '导入成功')
                const remote_name = git_src
                    .split('/')
                    .slice(-1)[0]
                    .replace('.git', '')
                console.log('remote_name', remote_name)
                const fi_src = path.join(dir_src, remote_name)

                reply(e, 'import_git_step', 'end:' + fi_src)
            },
        )
    } catch (error) {
        reply(e, 'import_git_step', '导入失败')
    }
}
