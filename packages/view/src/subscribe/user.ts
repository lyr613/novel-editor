import { BehaviorSubject, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { SoftAjax } from '@/function'

export const a = 4

class user {
    /** 用户名 */
    name: string = ''
    sign = false
}

/** 用户信息 */
export const User$ = new BehaviorSubject(new user())
/** next已获得最新的用户信息 */
const FindUser$ = new Subject()
// FindUser$.pipe(map(() => SoftAjax('find-user'))).subscribe(req => {
// 	req.subscribe()
// })
