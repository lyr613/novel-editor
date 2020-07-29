import { v4 as uuid } from 'uuid'

/**
 * 创造一个32位字母数字组成的uuid
 */
export function mk_uuid() {
    const id = uuid().replace(/-/g, '')
    return id
}
