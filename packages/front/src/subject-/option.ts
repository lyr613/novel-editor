import { BehaviorSubject } from 'rxjs'
import { debounceTime, skip } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { fs_write } from 'tool-/fs'
import joi from 'joi'

/** 编辑器配置 */
export const option$ = new BehaviorSubject(null as null | option_vo)

/** 标准化配置 */
function formatter_option(old: option_vo | null): option_vo {
    const defopt = default_option()
    const readed = Object.assign({}, old)

    const ui = joi
        .object({
            theme: joi.required().only().allow('word', 'excel', 'ppt').failover('word'),
        })
        .required()
        .failover(defopt.ui)
    const schema = joi.object({
        ui,
    })

    const re = schema.validate(readed)
    return re.value
}

/** 默认配置 */
export function default_option(): option_vo {
    return {
        ui: {
            /** 主题 */
            theme: 'word',
        },
    }
}

/** 加载编辑器配置 */
export function load_option() {
    const opt = ipc().sendSync('shard_load_editer_option').data
    const opt2 = formatter_option(opt)
    option$.next(opt2)
}

// 自动保存编辑器配置
option$.pipe(skip(1), debounceTime(2000)).subscribe((opt) => {
    console.log('保存编辑器配置')
    const optsrc = ipc().sendSync('path', 'option')
    fs_write(optsrc, JSON.stringify(opt))
})
