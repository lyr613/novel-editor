import { ConstBookPath } from 'const-/book-path'
import { ipcMain } from 'electron'
import { WindowUtil } from 'window-'
import fs from 'fs'
import cp from 'child_process'

class _t {
    watch() {
        ipcMain.on('threads_vscode', (e, book_id) => {
            this.threads_vscode(book_id)
        })
    }
    threads_vscode(book_id: string) {
        const book = WindowUtil.book_map.get(book_id)!
        const drawio_src = ConstBookPath.full_src(book.src, 'threads')
        if (!fs.existsSync(drawio_src)) {
            fs.writeFileSync(drawio_src, '')
        }
        cp.execSync(`code ${book.src}`)
        setTimeout(() => {
            cp.execSync(`code ${drawio_src}`)
        }, 1500)
    }
}

export const WatchThreads = new _t()
