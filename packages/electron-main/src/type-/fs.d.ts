interface fs_dto {
    b: boolean
    /** 错误时为原因 */
    txt: string
}

interface fs_json_dto<T = any> extends fs_dto {
    data: T
}
