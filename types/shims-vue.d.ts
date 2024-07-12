// 添加一个声明来告诉TypeScript如何处理.vue文件

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
