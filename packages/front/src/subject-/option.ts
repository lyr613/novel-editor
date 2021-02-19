import { debounceTime, skip, take } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { themes } from 'style-/theme'
import { ToolFs } from 'tool-/fs'
import { _sub_base } from './base'

class _option extends _sub_base<option_vo> {
    /** 加载编辑器配置, 只在打开编辑器的时候使用 */
    load() {
        const opt = ipc().sendSync('option_load')
        this.edit$.next(opt)
        themes.use(opt.ui.theme)
    }
    save() {
        this.edit$.pipe(take(1)).subscribe((opt) => {
            console.log('保存编辑器配置, 不管是否成功')
            const optsrc = ipc().sendSync('path', 'option')
            ToolFs.write(optsrc, JSON.stringify(opt))
        })
    }
}

/** 编辑器配置 */
export const SubOption = new _option()
