// 这里是通俗的解释 详情请前往官方文档查阅
module.exports = {
    ignores: [commit => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
        // 信息以空格开头
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'], // 信息最大长度
        'header-max-length': [2, 'always', 108], // 信息不能未空
        'subject-empty': [2, 'never'], // 信息类型不能未空
        'type-empty': [2, 'never'], // 提交信息的类型 下文有介绍
        'type-enum': [
            2,
            'always',
            [
                // 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包）
                'build',
                // 其他繁杂事务的变动
                'chore',
                // 对 CI 相关更改
                'ci',
                // 文档书写改动(eg. readme/changelog/release)
                'docs',
                // 增加一个新功能、新特性（体现在changelog）
                'feat',
                // bug修复（体现在changelog）
                'fix',
                // 正在运行中，且有可能出现不稳定运行状态的提交
                'wip',
                // 性能优化相关（体现在changelog）
                'perf',
                // 代码重构
                'refactor',
                // 代码回滚(体现在changelog)
                'revert',
                // 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
                'style',
                // 增加新的测试功能或更改原有的测试模块
                'test',
                'workflow',
                'types',
                'release',
                // 临时的提交
                'temp'
            ]
        ]
    }
};
