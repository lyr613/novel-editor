declare namespace Book {
    interface book {
        /** 时间戳 */
        id: string
        /** 书名 */
        name: string
        /** 存放路径 */
        src: string
        /** 封面 */
        cover: string
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
        /** 删除 */
        hidden: boolean
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
}
