import pinia from '@/store';
import type { ISettingState } from './types';

export const useSettingStoreHook = defineStore('setting', {
    state: (): ISettingState => {
        return {
            titles: []
        };
    },
    actions: {
        setTitles(titles: string[]) {
            this.titles = titles;
        }
    }
});

/**
 * 导出该Store
 * 在setup函数外部使用 store，需要将原本被传递给应用 的 pinia 实例传递给 useStore() 函数：
 */
export const useSettingStore = () => {
    return useSettingStoreHook(pinia);
};
