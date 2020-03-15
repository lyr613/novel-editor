import fs from 'fs'
import path from 'path'

export interface dir {
    full_path: string
    children: (file | dir)[]
}
export interface file {
    full_path: string
}

/**
 * 构造文件树
 * @param src 路径
 */
export function build_tree(src: string): dir | file | null {
    if (!fs.existsSync(src)) {
        return null
    }
    if (!be_dir(src)) {
        return of_file(src)
    }
    const root = of_dir(src)
    deep(root)
    return root

    function deep(dir: dir) {
        const dfs = fs.readdirSync(dir.full_path)
        dfs.forEach((df) => {
            const src = path.resolve(dir.full_path, df)
            if (be_dir(src)) {
                const cdir = of_dir(src)
                dir.children.push(cdir)
                deep(cdir)
            } else {
                const dfile = of_file(src)
                dir.children.push(dfile)
            }
        })
    }
}

/**
 * 构造文件塔
 * @param src 路径
 * @returns 左浅右深
 */
export function build_tower(src: string): (file | dir)[][] {
    const tree = build_tree(src)
    if (tree === null) {
        return []
    }
    const re = [[tree]]
    if (!('children' in tree)) {
        return re
    }
    let new_line: (dir | file)[] = []
    let si = 0
    while (re[si].length) {
        re[si].forEach((df) => {
            if ('children' in df) {
                new_line.push(...df.children)
            }
        })
        si++
        re.push(new_line)
        new_line = []
    }
    re.pop()
    return re
}

/**
 *  把来源目录下的所有文件(夹)拷贝到目标路径下
 * @param source 来源绝对路径
 * @param target 目标绝对路径
 */
export async function copy_dir(source: string, target: string) {
    const tower = build_tower(source)
    tower.shift()
    for (const line of tower) {
        for (const df of line) {
            const src = df.full_path.replace(source, target)
            if ('children' in df) {
                fs.mkdirSync(src)
            } else {
                await copy_file(df.full_path, src)
            }
        }
    }
}

/**
 * 删除此路径, 无论是文件或文件夹
 * @param src 绝对路径
 */
export function delete_src(src: string) {
    const tower = build_tower(src).reverse()
    for (const line of tower) {
        for (const df of line) {
            if ('children' in df) {
                fs.rmdirSync(df.full_path)
            } else {
                fs.unlinkSync(df.full_path)
            }
        }
    }
}
/**
 * 删除此路径下的所有文件或文件夹
 * @param src 绝对路径
 */
export function clean_src(src: string) {
    const tower = build_tower(src).reverse()
    tower.pop()
    for (const line of tower) {
        for (const df of line) {
            if ('children' in df) {
                fs.rmdirSync(df.full_path)
            } else {
                fs.unlinkSync(df.full_path)
            }
        }
    }
}

/**
 * 判断是否为文件
 * @param src
 */
export function be_file(src: string) {
    const r = fs.lstatSync(src)
    return r.isFile()
}

/**
 * 判断是否为文件夹
 * @param src
 */
export function be_dir(src: string) {
    const r = fs.lstatSync(src)
    return r.isDirectory()
}

function of_dir(src: string): dir {
    return {
        full_path: path.resolve(src),
        children: [],
    }
}
function of_file(src: string): file {
    return {
        full_path: path.resolve(src),
    }
}

export function copy_file(source: string, target: string) {
    return new Promise((res) => {
        const r = fs.createReadStream(source)
        const w = fs.createWriteStream(target)
        r.on('data', function(chunk) {
            // 当有数据流出时，写入数据
            if (w.write(chunk) === false) {
                // 如果没有写完，暂停读取流
                r.pause()
            }
        })

        w.on('drain', function() {
            // 写完后，继续读取
            r.resume()
        })

        r.on('end', function() {
            // 当没有数据时，关闭数据流
            w.end()
            res()
        })
    })
}
