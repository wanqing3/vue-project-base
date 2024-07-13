<template>
    <div class="login-box">
        <div class="login-form">
            <h1>企业中台管理系统</h1>
            <el-form :model="userInfo" :rules="rules" center class="login-info">
                <el-form-item prop="username">
                    <el-input v-model="userInfo.username" type="text" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="userInfo.password" type="text" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="handleUserLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStoreHook } from '@/store/modules/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

/* 数据状态变量管理 ------------------------------------------------------------*/
const userStore = useUserStoreHook(); // 模块store
const router = useRouter(); // 路由实例对象
const userInfo = reactive({
    username: 'admin',
    password: 'admin'
}); // 表单数据
const rules = reactive({
    username: {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }
}); // 表单校验规则

/* 函数逻辑------------------------------------------------------------------ */
/**
 * 用户登录，并store用户信息
 */
const handleUserLogin = async () => {
    userStore.storeUserLogin(userInfo).then(() => {
        // 登录成功后，跳转到首页
        router.push('/');
    });
};
</script>
<style lang="less" scoped>
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--dawei-background-color);

    .login-form {
        display: flex;
        width: 300px;
        text-align: center;
        flex-direction: column;

        .login-info {
            height: max-content;
        }
    }
}
</style>
