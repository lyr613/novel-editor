type theme_vo = 'word' | 'excel' | 'ppt'

/** 编辑器配置 */
declare interface option_vo {
    /** 书架 */
    shelf: {
        /** 书目列表 */
        list: string[]
    }
    ui: {
        /** 主题 */
        theme: theme_vo
    }
}
