import { BehaviorSubject } from 'rxjs'

export const _filter$ = new BehaviorSubject({
    all: true,
    chapter: false,
    name: '',
})
