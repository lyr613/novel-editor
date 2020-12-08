interface book_vo {
    /** uuid */
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
