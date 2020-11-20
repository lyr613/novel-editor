import { BehaviorSubject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { fs_write } from 'tool-/fs'

export const option$ = new BehaviorSubject(null as null | option_vo)

function formatter_option(old: option_vo | null) {
    const opt = default_option()
    // ui.theme
    opt.ui.theme = old?.ui?.theme ?? 'word'
    if (!['word', 'excel', 'ppt'].includes(opt.ui.theme)) {
        opt.ui.theme = 'word'
    }
    return opt
}

export function default_option(): option_vo {
    return {
        ui: {
            /** 主题 */
            theme: 'word',
        },
    }
}

export function load_option() {
    const opt = ipc().sendSync('shard_load_editer_option').data
    const opt2 = formatter_option(opt)
    option$.next(opt2)
}

option$.pipe(debounceTime(2000)).subscribe((opt) => {
    // fs_write()
})
