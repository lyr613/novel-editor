/** 配置git commit提交信息检查 */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 添加功能
                'fix', // Solves a bug. 修复bug
                're', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
                'del', //删除
                'doc', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
                'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
                'merge', // Merge branch ? of ?.
                'perf', // Improves performance. 优化相关，比如提升性能、体验
                'revert', // Reverts a previous commit. 回滚到上一个版本
                'test', // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
                'save', // 不知道用啥了就用这个吧
            ],
        ],
    },
}

/**
 * 格式:
 * head: short msg
 * 空行
 * body(可省略)
 * 空行
 * foot(可省略 )
 */

/**
 * 示例
 * docs: 添加一个提交注释
 */
