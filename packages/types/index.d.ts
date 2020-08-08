import 'electron'

declare global {
    type int = number
    type float = number
    interface Param {
        [k: string]: any
    }
    interface book_dto {
        id: string
        /** 书名 */
        name: string
        /** 存放路径 */
        src: string
        /** 封面 */
        cover: string
        /** 是否为git仓库, 这里只检查远程仓库 */
        git: boolean
    }
    /** 章 */
    interface chapter {
        /** 32位uuid */
        id: string
        /** 名字 */
        name: string
        /** 节[] */
        children: node[]
        /** 删除 */
        hidden: boolean
        /** 展开 */
        expand: boolean
    }

    /** 节 */
    interface node {
        /** 32位uuid */
        id: string
        /** 名字 */
        name: string
        /** 所在章id */
        chapter_id: string
        /** 隐藏 */
        hidden: boolean
        will_delete?: boolean
        word_count?: number
    }
    /** 大纲(读取) */
    interface outline {
        text: string
        /** 相关npc id[] */
        npcs?: string[]
    }
    /** 大纲(展示) */
    interface outline_show {
        chapter_id: string
        text: string
        npcs: npc[]
        /** 章名 */
        title: string
    }
    /** 角色 */
    interface npc {
        /** 32 uuid */
        id: string
        base: {
            name: string
            /**
             * 性别
             * 0: 女, 1: 男, 2: 其他
             */
            gender: '0' | '1' | '2'
            /** 活跃时期 [y,m,d,y,m,d] */
            active: string[]
            /** 简述 */
            description: string
        }
        /** 非必要 */
        uneed: {
            /** 寿命 [y,m,d,y,m,d] */
            life: string[]
            /** 关系  */
            links: {
                /** 描述 */
                description: string
                npc_id: string
            }[]
            /** 别名, 以空格分割 */
            alias?: string
            /** 重要度, 默认0 */
            important?: number
        }
    }
    /** 事件 */
    interface incident {
        /** 32 uuid */
        id: string
        label: string
        text: string
        /** 起止时间 [y,m,d,y,m,d]  */
        life: string[]
        /** 相关角色 id */
        npc_ids: string[]
        /** 线索 */
        link_line: {
            /** 0-10:: 0: 独立, 1-10: 线索1-10 */
            index: number
            /** 开始节id, 可能为空字符串*/
            start_node_id: string
            /** 结束节id,可能为空字符串 */
            end_node_id: string
        }
        /** 字数跨度 */
        word: {
            /** 预计 */
            preset: number
            /** 实际 */
            real: number
        }
    }
    /** 大纲(读存) */
    interface outline {
        /** 取自章id */
        id: string
        text: string
        /** 相关事件 id[] */
        incident_ids: string[]
    }
    /** 编辑器设置 */
    interface setting {
        /** 通用 */
        common: {
            /** 主题 */
            theme: 'word' | 'excel' | 'ppt' | 'onenote' | 'gray' | 'dark'
            scroll?: {
                width: string
                color: string
            }
        }
        /** 书架页 */
        shelf: {
            /** 书目列表 */
            book_list: string[]
        }
        /** 编辑页 */
        editer: {
            /** 大纲模块宽高, 其他模块联动更改 */
            outline_layout: wh
            /** 编辑窗口宽高 */
            editer_layout: wh
            /** 编辑窗口偏移 */
            editer_transform: wh
        }
        /** 敏感词 */
        sensitive?: string[]
        font?: {
            size: number
            family: string
        }
        git: boolean
    }
}

interface wh {
    width: number
    height: number
}
