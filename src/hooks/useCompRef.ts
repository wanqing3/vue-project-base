import { ref } from 'vue';

/**
 * 获取组件实例的ref，带组件实例类型Typescript类型注释
 * T 组件类 可使用ts的<typeof 组件实例>获取
 * @returns
 */
export function useCompRef<T extends abstract new (...args: any) => any>() {
    return ref<InstanceType<T>>();
}
