import { _watch_book } from './book'
import { _watch_chapter } from './chapter'
import { _watch_cube } from './cube'
import { _watch_fs } from './fs'
import { _watch_hotkey } from './hotkey'
import { _watch_option } from './option'
import { _watch_path } from './path'
import { _watch_shard } from './shard'
import { _watch_window } from './window'

/** 观察所有通信 */
export function watch_all() {
    _watch_window()
    _watch_fs()
    _watch_shard()
    _watch_path()
    _watch_option()
    _watch_book()
    _watch_chapter()
    _watch_hotkey()
    _watch_cube()
}
