import { watch_npc } from './npc'
import { watch_book } from './book'
import { watch_node } from './node'
import { watch_hotkey } from './hot-key'
import { watch_outline } from './outline'
import { watch_incident } from './incident'
import { watch_fs_common } from './fs-common'
import { watch_zip } from './zip'
import { watch_book_common } from './book-common'
import { watch_git } from './git'
import { watch_editer } from './about-editer'
import { watch_ui } from './ui'

export function set_watch(win: Electron.BrowserWindow) {
    watch_book()
    watch_npc()
    watch_node()
    watch_outline()
    watch_incident()
    watch_fs_common()
    watch_zip()
    watch_book_common()
    watch_git()
    watch_editer()
    watch_ui()
    watch_hotkey(win)
}
