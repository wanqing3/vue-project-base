<template>
    <div class="header">
        <div class="flex-center logo">LOGO</div>
        <div class="flex-grow-1" />
        <div class="flex-center m05 color-dark-black">
            <el-space>
                <i-ep-user />
                <span>{{ username }}</span>
            </el-space>
        </div>
        <div class="flex-center m05 color-dark--black setting" @click="handleOpenSetting"><i-ep-setting /></div>
        <el-drawer v-model="showSetting" :with-header="false" :show-close="false">
            <div class="setting-header">
                <h2>项目配置</h2>
                <i-ep-close @click="handleCloseSetting" />
            </div>
            <div class="log-out flex-center">
                <el-button type="danger" plain @click="handleLogout">退出</el-button>
            </div>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { useUserStoreHook } from '@/store/modules/user';
/* 数据状态变量管理 ------------------------------------------------------------*/
const userStore = useUserStoreHook(); // 模块store
const username = userStore.username; // 获取用户名
const router = useRouter(); // 路由实例对象
const showSetting = ref(false); // setting显示隐藏

/* 函数逻辑------------------------------------------------------------------- */
/**
 * 打开设置
 */
const handleOpenSetting = () => {
    showSetting.value = true;
};
/**
 * 关闭设置
 */
const handleCloseSetting = () => {
    showSetting.value = false;
};
/**
 * 退出登录
 */
const handleLogout = () => {
    sessionStorage.removeItem('userInfo');
    router.push('/login');
};
</script>
<style lang="less" scoped>
.header {
    display: flex;
    padding: 0 15px;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 20px rgb(195 233 252 / 40%);

    .setting {
        cursor: pointer;
    }

    .setting-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        color: var(--dawei-color-dark-black);
    }
}
</style>
