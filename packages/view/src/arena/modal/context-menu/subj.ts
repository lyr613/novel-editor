import { BehaviorSubject, Subject } from 'rxjs'
import { menu_config, menu_select } from './type'

/**
 * 菜单配置
 */
export const menu_config$ = new BehaviorSubject<null | menu_config>(null)

/**
 * 菜单选择结果
 */
export const menu_select$ = new Subject<menu_select>()
