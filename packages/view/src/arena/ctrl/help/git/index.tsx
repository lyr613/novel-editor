// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { style as s } from '../style'
import { css } from 'aphrodite/no-important'
import SectionHeader from '@/component/section-header'
import { ipc } from '@/const'

export default function Git() {
    return (
        <div>
            <SectionHeader>解释</SectionHeader>
            <div className={css(s.aline)}>
                对于非程序开发来说, git的入门使用过于复杂了, 因此我默认隐藏了相关模块. 如果确实需要云端仓库, 尝试安装git
            </div>

            <SectionHeader>需要</SectionHeader>
            <div className={css(s.aline)}>安装 git: </div>
            <div
                className={css(s.aline, s.link)}
                onClick={() => {
                    ipc().send('websrc', 'https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git')
                }}
            >
                https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git
            </div>
            <div className={css(s.aline)}>注册码云</div>
            <div
                className={css(s.aline, s.link)}
                onClick={() => {
                    ipc().send('websrc', 'https://gitee.com/')
                }}
            >
                https://gitee.com/
            </div>
            <div className={css(s.aline)}>生成ssh key</div>
            <div
                className={css(s.aline, s.link)}
                onClick={() => {
                    ipc().send(
                        'websrc',
                        'https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5',
                    )
                }}
            >
                https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5
            </div>

            <SectionHeader>最后</SectionHeader>
            <div className={css(s.aline)}>日常使用是非常简单的, 只有两三个按钮, 点击就可以完成远程仓库的推送和拉取</div>
            <div className={css(s.aline)}></div>
        </div>
    )
}
