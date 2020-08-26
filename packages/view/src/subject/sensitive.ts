import { BehaviorSubject, from, Subject, of } from 'rxjs'
import { switchMap, map, throttleTime, debounceTime, tap } from 'rxjs/operators'
import { editer_setting$ } from './edit-setting'

/** 是否检查敏感词 */
export const sensitive_can_check$ = new BehaviorSubject(true)

interface sensitive_checker {
    // editor: monaco
}
export const sensitive_editor_resover$ = new Subject<monaco.editor.IStandaloneCodeEditor>()

/** 已查到的敏感词
 *
 */
export const sensitive_did_find_li$ = sensitive_can_check$.pipe(
    switchMap((can) =>
        !can
            ? of([])
            : sensitive_editor_resover$.pipe(
                  //
                  throttleTime(1000),
                  switchMap((editor) =>
                      editer_setting$.pipe(
                          //
                          map((eset) => {
                              const words = (eset.sensitive || []).filter(Boolean)
                              const model = editor.getModel()
                              if (!model || !words.length) {
                                  return []
                              }
                              const reg = `(${words.join('|')})`
                              const fi_range = model.findMatches(reg, true, true, false, null, true)
                              return fi_range
                          }),
                      ),
                  ),
              ),
    ),
)

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
