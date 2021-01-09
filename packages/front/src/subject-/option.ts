import { BehaviorSubject } from 'rxjs'
import { debounceTime, skip } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { themes } from 'style-/theme'
import { ToolFs } from 'tool-/fs'

/** 编辑器配置 */
export const option$ = new BehaviorSubject(null as null | option_vo)

/** 加载编辑器配置 */
export function load_option() {
    const opt = ipc().sendSync('option_load')
    option$.next(opt)
    themes.use(opt.ui.theme)
}

// 自动保存编辑器配置
option$.pipe(skip(1), debounceTime(2000)).subscribe((opt) => {
    console.log('保存编辑器配置, 不管是否成功')
    const optsrc = ipc().sendSync('path', 'option')
    ToolFs.write(optsrc, JSON.stringify(opt))
})
