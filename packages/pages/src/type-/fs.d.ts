interface fs_dto {
    b: boolean
    /** 错误时为原因 */
    txt: string
}

interface msg_dto<T = any> extends fs_dto {
    /** 错误时可能没有 */
    data: T
}
