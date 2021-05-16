import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import path from 'path'
import { ConstAppPath } from 'const-/app-path'
import fs from 'fs-extra'
import { UtilFs } from 'util-/fs'
import joi from 'joi'

/** 编辑器配置 */
export function _watch_option() {
    ipcMain.on('option_load', option_load)
}

/** 读取编辑器配置 */
function option_load(e: Electron.IpcMainEvent) {
    const re = OptionLoad.effect_load()
    const msg = UtilReply.msg(re)
    UtilReply.reply(e, 'option_load', msg)
}

/** 读取配置集合 */
export class OptionLoad {
    /** 读取并标准化编辑器配置 */
    static effect_load(): option_vo {
        const opt_dir = path.join(ConstAppPath.option, '..')
        if (!fs.existsSync(opt_dir)) {
            fs.mkdirSync(opt_dir)
        }
        const jn = UtilFs.read_json<option_vo>(ConstAppPath.option)

        return OptionLoad.mk_standard_option(jn.data)
    }
    /** 默认配置 */
    static default_option(): option_vo {
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

    /** 标准化配置 */
    static mk_standard_option(old: option_vo | null): option_vo {
        const defopt = OptionLoad.default_option()
        const readed: option_vo = Object.assign({}, old)
        // 分配置
        const shelf = joi
            .object({
                list: joi
                    .array()
                    .items(
                        ...Array.from(
                            { length: !Array.isArray(readed?.shelf?.list) ? 0 : readed.shelf.list.length },
                            () => joi.string(),
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
}
