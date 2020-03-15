import * as monaco from 'monaco-editor'
import { sensitive_list$, sensitive_can_check$ } from '@/subject/sensitive'
import { sensitive_searched_list$ } from '../subj'
import { Subject } from 'rxjs'
import { debounceTime, switchMap, tap } from 'rxjs/operators'

/** 推入编辑器实例, 检查敏感词 */
export const check_words$ = new Subject<monaco.editor.IStandaloneCodeEditor>()

sensitive_list$
    .pipe(
        debounceTime(300),
        switchMap(() => check_words$),
        debounceTime(2000),
    )
    .subscribe((editer) => {
        const model = editer.getModel()
        if (model) {
            // 实际一直检测, 但是区分展示不展示, 不然不检测后, 切换节, 再显示获取不到变化
            const words = sensitive_list$.value
            const can = sensitive_can_check$.value
            if (!words.length) {
                return
            }
            const reg = `(${words.join('|')})`
            const fi_range = model.findMatches(reg, true, true, false, null, true)
            sensitive_searched_list$.next(fi_range)
            // fi_range
            // 	.map(v => v.range)
            // 	.forEach(range => {
            // 		editer.deltaDecorations(
            // 			[],
            // 			[
            // 				{
            // 					range,
            // 					options: {
            // 						// isWholeLine: true,
            // 						// className: 'editer-line', // 此范围背景
            // 						glyphMarginClassName: 'editer-glyphMargin', // 此行左侧
            // 						minimap: {
            // 							position: 2,
            // 							color: 'red',
            // 						},
            // 					},
            // 				},
            // 			],
            // 		)
            // 	})
        }
    })
