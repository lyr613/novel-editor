import { debounceTime, skip, take } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { themes } from 'style-/theme'
import { ToolFs } from 'tool-/fs'
import { _sub_base } from './base'

class _option extends _sub_base<option_vo> {
    /** 加载编辑器配置, 只在打开编辑器的时候使用 */
    load() {
        const opt_msg: msg_dto<option_vo> = ipc().sendSync('option_load')
        const opt = opt_msg.data
        this.edit$.next(opt)
        themes.use(opt.ui.theme)
    }
    save() {
        this.edit$.pipe(take(1)).subscribe((opt) => {
            console.log('保存编辑器配置, 不管是否成功')
            const optsrc: msg_dto<string> = ipc().sendSync('path_get', 'option')
            ToolFs.write(optsrc.data, JSON.stringify(opt))
        })
    }
    /** 只更新书架列表 */
    update_shelf() {
        const opt: msg_dto<option_vo> = ipc().sendSync('option_load')
        this.edit$.next(opt.data)
    }
}

/** 编辑器配置 */
export const SubOption = new _option()
