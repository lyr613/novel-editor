import { OperatorFunction, Observable, Operator, Subscriber } from 'rxjs'

class ShallowCopySubscriber<T> extends Subscriber<T> {
    destination: Subscriber<T>
    constructor(destination: Subscriber<T>) {
        super(destination)
        this.destination = destination
    }

    protected _next(value: T) {
        let result: T = value
        try {
            switch (typeof value) {
                case 'object':
                    const tostring = Object.prototype.toString.call(value)
                    if (Array.isArray(value)) {
                        result = [...value] as any
                    } else if (tostring === '[object Object]') {
                        result = { ...value }
                    } else if (value instanceof Set) {
                        result = new Set(value) as any
                    } else if (value instanceof Map) {
                        result = new Map(value) as any
                    }
                    break

                default:
                    break
            }
        } catch (err) {
            this.destination.error(err)
            return
        }
        this.destination.next(result)
    }
}

class ShallowCopyOperator<T> implements Operator<T, T> {
    call(subscriber: Subscriber<T>, source: any): any {
        return source.subscribe(new ShallowCopySubscriber(subscriber))
    }
}

/**
 * ## 浅拷贝 `shallowCopy`
 *
 * 只处理4种数据 `only handle`:
 * - array
 * - object
 * - set
 * - map
 *
 * 其他类型将直接赋值 `other types: result = value`
 *
 * 示例 `example`:
 * ```typescript
 * of([1, 2, 3]).pipe(shallowCopy())
 * ```
 */
export function shallowCopy<T>(): OperatorFunction<T, T> {
    return (source: Observable<T>) => source.lift(new ShallowCopyOperator())
}

// const value: any = new Map([[1, 2]]);
// of(value)
//     .pipe(shallowCopy())
//     .subscribe(re => {
//         console.log(value === re);
//         console.log(re);
//     });
