module.exports = {
    root: true,
    // 配置语言选项
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    // 引入推荐的语法校验规则
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        /*
         * eslint-config-prettier 的作用是关闭eslint中与prettier相互冲突的规则
         * eslint-plugin-prettier 赋予eslint用prettier格式化代码的能力
         */
        'plugin:prettier/recommended'
    ],
    overrides: [],
    /* 
    这里一定要配置对 先使用vue-eslint-parser 再使用 @typescript-eslint/parser
    先解析 <template> 标签中的内容 然后再解析 vue <script> 标签中的 TS 代码
    */
    // 配置解析器
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // 将 TypeScript 转换为与 ESTree 格式兼容的解析器，好可以在 ESLint 中使用。
        parser: '@typescript-eslint/parser'
    },
    plugins: ['@typescript-eslint', 'vue'],
    /*
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        //缩进风格
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        //语句强制分号结尾
        semi: [2, 'always'],
        //引号类型
        quotes: [2, 'single'],
        // 标签执行自动关闭方式
        'vue/html-self-closing': [
            2,
            {
                html: {
                    void: 'never',
                    normal: 'always',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        // // 标签属性折行
        // 'vue/max-attributes-per-line': [
        //     2,
        //     {
        //         singleline: {
        //             max: 10
        //         },
        //         multiline: {
        //             max: 1
        //         }
        //     }
        // ],
        // 标签属性折行第一个属性的位置
        'vue/first-attribute-linebreak': [
            2,
            {
                singleline: 'ignore',
                multiline: 'below'
            }
        ],
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index', 'Header'] //需要忽略的组件名
            }
        ],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-debugger': 'off',
        'vue/no-unused-vars': 'warn',
        'vue/no-template-shadow': 'off',
        'vue/require-v-for-key': 'off',
        'vue/no-textarea-mustache': 'off',
        'vue/no-v-html': 'off'
    }
};
