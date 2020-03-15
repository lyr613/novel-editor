import { BehaviorSubject } from 'rxjs'
import { sensitive_sg } from '@/storage/sensitive'
import { switchMap, map } from 'rxjs/operators'

/** 敏感词列表 */
export const sensitive_list$ = new BehaviorSubject(sensitive_sg.value)

/** 是否检查敏感词 */
export const sensitive_can_check$ = new BehaviorSubject(true)

/** 敏感词 - 检查用的列表 */
export const sensitive_check_list$ = new BehaviorSubject<string[]>([])
sensitive_list$
    .pipe(
        switchMap((li) => {
            return sensitive_can_check$.pipe(
                map((b) => {
                    if (b) {
                        return li
                    }
                    return []
                }),
            )
        }),
    )
    .subscribe((li) => {
        sensitive_check_list$.next(li)
    })

sensitive_list$.subscribe((li) => {
    sensitive_sg.save(li)
})
