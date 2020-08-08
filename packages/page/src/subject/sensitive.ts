import { BehaviorSubject } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { editer_setting$ } from './edit-setting'

/** 是否检查敏感词 */
export const sensitive_can_check$ = new BehaviorSubject(true)

/** 敏感词 - 检查用的列表 */
export const sensitive_check_list$ = editer_setting$.pipe(
    switchMap((opt) =>
        sensitive_can_check$.pipe(
            map((can) => {
                if (can) {
                    return (opt?.sensitive ?? []).filter(Boolean)
                }
                return []
            }),
        ),
    ),
)
