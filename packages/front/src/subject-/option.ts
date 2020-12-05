import { BehaviorSubject } from 'rxjs'
import { debounceTime, skip } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { fs_write } from 'tool-/fs'
import joi from 'joi'
import { themes } from 'style-/theme'

/** 编辑器配置 */
export const option$ = new BehaviorSubject(null as null | option_vo)

/** 标准化配置 */
function formatter_option(old: option_vo | null): option_vo {
    const defopt = default_option()
    const readed: option_vo = Object.assign({}, old)
    // 分配置
    const shelf = joi
        .object({
            list: joi
                .array()
                .items(
                    ...Array.from({ length: !Array.isArray(readed?.shelf?.list) ? 0 : readed.shelf.list.length }, () =>
                        joi.string(),
                    ),
                ),
        })
        .required()
        .failover(defopt.shelf)
    const ui = joi
        .object({
            theme: joi.required().only().allow('word', 'excel', 'ppt').failover('word'),
        })
        .required()
        .failover(defopt.ui)

    /** 总配置 */
    const schema = joi.object({
        shelf,
        ui,
    })

    const re = schema.validate(readed)
    console.log('读取到编辑器配置', re)

    return re.value
}

/** 默认配置 */
export function default_option(): option_vo {
    return {
        /** 书架 */
        shelf: {
            /** 书列表 */
            list: [],
        },
        ui: {
            /** 主题 */
            theme: 'word',
        },
    }
}

/** 加载编辑器配置 */
export function load_option() {
    const opt_maybe_err = ipc().sendSync('shard_load_editer_option').data
    const opt = formatter_option(opt_maybe_err)
    option$.next(opt)
    themes.use(opt.ui.theme)
}

// 自动保存编辑器配置
option$.pipe(skip(1), debounceTime(2000)).subscribe((opt) => {
    console.log('保存编辑器配置, 不管是否成功')
    const optsrc = ipc().sendSync('path', 'option')
    fs_write(optsrc, JSON.stringify(opt))
})
