import { BehaviorSubject } from 'rxjs'
import { incident_li$ } from '@/source/incident'
import { switchMap, map } from 'rxjs/operators'
import { date_encode } from '@/util'

// 过滤
export const filter$ = new BehaviorSubject({
    /** 名字 */
    label: '',
})

// 过滤后的列表
export const incident_list_filted$ = incident_li$.pipe(
    switchMap((list) =>
        filter$.pipe(
            map((fil) =>
                list
                    .filter((v) => {
                        if (fil.label) {
                            const reg = new RegExp(fil.label.split('').join('.*'))
                            if (!reg.test(v.label)) {
                                return false
                            }
                        }
                        return true
                    })
                    .sort((a, b) => {
                        return date_encode(a.life.slice(0, 3)) - date_encode(b.life.slice(0, 3))
                    }),
            ),
        ),
    ),
)
