import 'electron'
import './book'
import './settting'
import './monaco'

declare global {
    type int = number
    type float = number
    interface Param {
        [k: string]: any
    }
    interface Window {
        electron: Electron.CommonInterface
        monaco: monaco
    }
    type book = Book.book
    type chapter = Book.chapter
    type node = Book.node
    type npc = Setting.npc
    type incident = Setting.incident
    type outline = Setting.outline
    type setting = Setting.setting
}

interface monaco extends monamo {}
