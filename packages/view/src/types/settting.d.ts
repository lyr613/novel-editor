declare namespace Setting {
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
            /** 关系 {link_name ,npc_uuid}[] */
            links: { link_name: string; npc_uuid: string }[]
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
}
