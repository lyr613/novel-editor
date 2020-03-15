export class BaseStorage<T extends string | Object> {
    /** storage key */
    key: string = ''
    __value!: T
    storage = window.localStorage
    default_value!: T

    public get value(): T {
        if (this.__value === undefined) {
            this.load()
        }
        return this.__value
    }

    load() {
        const str = this.storage.getItem(this.key)
        if (str === null) {
            this.__value = this.default_value
        } else {
            try {
                this.__value = JSON.parse(str)
            } catch (error) {
                this.__value = (str as T) ?? this.default_value
            }
        }
    }
    save() {
        if (typeof this.__value === 'string') {
            this.storage.setItem(this.key, this.__value)
        } else {
            try {
                const str = JSON.stringify(this.__value)
                this.storage.setItem(this.key, str)
            } catch (error) {}
        }
    }
    next(next: T) {
        this.__value = next
    }
}

/** 始终重写key, parse和stringify方法
 * 要保存新值, 使用save
 */
export class Base<T = string> {
    /** storage key 必须设置 */
    public get key(): string {
        return ''
    }
    /** 使用local或session */
    private get storage() {
        return window.localStorage
    }

    /** 值 */
    public get value() {
        return this.parse(this.storage.getItem(this.key))
    }
    /** 储存到本地 */
    public save(v: T) {
        const s = this.stringify(v)
        this.storage.setItem(this.key, s)
    }

    /** 解析从storage读取的文本 */
    parse(s: string | null): T {
        return s as any
    }
    /** 转化成需要储存的文本 */
    stringify(v: T): string {
        return v as any
    }
}
