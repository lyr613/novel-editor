/**
 * 方便使用跳转,
 * 从一页到另一页,
 * 有些需要再跳回, 因此在此记录
 * 注意使用后立即销毁
 */

import { BehaviorSubject } from 'rxjs'

/** 通过ctrl点击人物跳到npc的编辑页 */
export const edit_2_npc$ = new BehaviorSubject(false)

/** 搜索页快速跳到编辑页 */
export const search_2_edit$ = new BehaviorSubject(false)
