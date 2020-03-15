import { ServerBaseurl } from '@/const'
import { ajax } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'

type method = 'post' | 'get' | 'put' | 'delete'
export function SoftAjax(url: string, body = {}, method: method = 'post') {
    return ajax({
        url: ServerBaseurl + url,
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
        body,
    }).pipe(
        map((v) => v.response),
        catchError((err) => of(err.response)),
    )
}
