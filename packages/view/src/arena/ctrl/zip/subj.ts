import { BehaviorSubject } from 'rxjs'

export type witch = 'import' | 'export'
export const witch$ = new BehaviorSubject<witch>('import')
