import { BehaviorSubject } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'

/** 基本订阅
 * ---
 * 需要改写的:
 * - make方法
 */
export class _sub_base<T> {
    /** 列表 */
    readonly li$ = new BehaviorSubject([] as T[])
    /** 正在使用的id */
    readonly use_id$ = new BehaviorSubject('')
    /** 正在使用的 */
    get use$() {
        return this.li$.pipe(
            switchMap((li) => this.use_id$.pipe(map((id) => li.find((v) => (v as any).id === id)))),
            map((v) => v || null),
        )
    }
    /** 直接获取正在使用的 */
    get use(): T | null {
        let re: T | null = null
        this.use$.pipe(take(1)).subscribe((it) => {
            re = it
        })
        return re
    }
    /** 正在编辑杂项的 */
    readonly edit$ = new BehaviorSubject(this.make())
    /** 创建新的 */
    make(): T {
        return null as any
    }
}
