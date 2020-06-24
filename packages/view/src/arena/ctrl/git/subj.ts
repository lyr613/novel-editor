import { BehaviorSubject } from 'rxjs'

/** git仓库初始化码
 * 0: 初始: 检查中
 * 1: 没有初始化过
 * 2: 已经有
 * -1: 查找失败
 */
export const git_init_status$ = new BehaviorSubject(0)

/** git远端仓库码
 * 0: 初始: 检查中
 * 1: 没有远程仓库
 * 2: 有
 * -1: 查找失败
 */
export const git_remote_status$ = new BehaviorSubject(0)
