import { defineStore } from 'pinia';
import { userLogin } from '@/api/user';
import type { ILoginRequest } from '@/api/user/types';
import pinia from '@/store';
import type { IUserState } from './types';

/**
 * 定义store
 * setup函数内部使用
 */
export const useUserStoreHook = defineStore(
    // 唯一ID
    'userInfo',
    {
        // 用户数据
        state: (): IUserState => {
            return {
                username: '',
                accessToken: '',
                roles: ['']
            };
        },
        getters: {},
        actions: {
            /**
             * 存储用户数据
             * @param data
             * @returns
             */
            storeUserLogin(data: ILoginRequest) {
                return userLogin(data).then(res => {
                    const data = res.data;
                    this.username = data.username;
                    this.accessToken = data.accessToken;
                    this.roles = data.roles;
                    return res;
                });
                // catch已经由返回拦截器统一处理
            }
        },
        // 持久化配置 persist: true持久化所有store
        persist: {
            // 存储名称
            key: 'userInfo',
            // 存储方式
            storage: sessionStorage,
            // 用于指定 state 中 accessToken数据需要被持久化
            paths: ['username', 'accessToken', 'roles']
        }
    }
);

/**
 * 在setup函数外部使用
 * 需要将原本被传递给应用 的 pinia 实例传递给 useStore() 函数：
 */
export function useUserStore() {
    return useUserStoreHook(pinia);
}
