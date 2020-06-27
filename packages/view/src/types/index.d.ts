declare type int = number
declare type float = number

import 'electron'
import './book'
import './settting'

declare global {
    interface Param {
        [k: string]: any
    }
    interface Window {
        electron: Electron.CommonInterface
    }
    type book = Book.book
    type chapter = Book.chapter
    type node = Book.node
    type npc = Setting.npc
    type incident = Setting.incident
    type outline = Setting.outline
    type setting = Setting.setting
}
