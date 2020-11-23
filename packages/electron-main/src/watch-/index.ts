import { _watch_fs } from './fs'
import { _watch_path } from './path'
import { _watch_shard } from './shard'
import { _watch_window } from './window'

/** 观察所有通信 */
export function watch_all() {
    _watch_window()
    _watch_fs()
    _watch_shard()
    _watch_path()
}
