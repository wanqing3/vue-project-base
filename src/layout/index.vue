<template>
    <el-header class="layout-header">
        <Header />
    </el-header>
    <el-container class="layout-container">
        <el-aside width="200px">
            <el-menu :default-active="activeMenu" router>
                <template v-for="item in menuList" :key="item.path">
                    <el-menu-item v-if="item.children ? !item.children.length : true" :index="item.path">
                        <span>{{ item.meta!.title }}</span>
                    </el-menu-item>
                    <el-sub-menu v-else :index="item.path">
                        <template #title>
                            <span>{{ item.meta!.title }}</span>
                        </template>
                        <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
                            <span>{{ subItem.meta!.title }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-aside>
        <el-main>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="item in settingStore.titles" :key="item" :to="{ name: item }">{{
                    item
                }}</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view />
        </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { useSettingStoreHook } from '@/store/modules/setting';
import { ArrowRight } from '@element-plus/icons-vue';
import Header from './components/Header.vue';
/* 数据状态变量管理 ------------------------------------------------------------*/
const settingStore = useSettingStoreHook(); // store模块
const activeMenu = ref(''); // 当前激活菜单路由path
const router = useRouter(); // 路由实例对象
const route = useRoute(); // 当前匹配路由信息
const menuList = router.options.routes[0].children!.filter(route => route.meta?.isMenu); // 菜单列表

/* 函数逻辑------------------------------------------------------------------- */
onBeforeMount(() => {
    activeMenu.value = route.path;
});
onBeforeUpdate(() => {
    activeMenu.value = route.path;
});
</script>

<style lang="less" scoped>
// element-ui复写样式
.el-header.layout-header {
    padding: 0;
    margin-bottom: 5px;
}

.el-container.layout-container {
    height: calc(100% - 65px);

    .el-menu {
        height: 100%;
    }

    .el-breadcrumb {
        margin-bottom: 10px;
    }
}
</style>
