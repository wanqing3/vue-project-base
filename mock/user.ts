import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/mock/api/login',
        method: 'post',
        // 获取请求体
        response({ body }: any) {
            // 简单编写一个逻辑
            // 用户名不等于密码就是密码错误
            if (body.username !== body.password) {
                return {
                    code: 0,
                    message: '用户名或密码错误',
                    data: {
                        username: '',
                        roles: [],
                        accessToken: ''
                    }
                };
            }
            // 其余的则显示登录成功
            if (body.username === 'admin') {
                return {
                    code: 1,
                    message: '登录成功',
                    data: {
                        username: 'admin',
                        roles: ['admin'],
                        accessToken: 'admin'
                    }
                };
            } else {
                return {
                    code: 0,
                    message: 'token失效',
                    data: {
                        username: '',
                        roles: [],
                        accessToken: ''
                    }
                };
            }
        }
    },
    {
        // 获取用户信息的接口
        url: '/mock/api/getUserInfo',
        method: 'post',
        response: ({ body }: any) => {
            if (body.accessToken === 'dawei') {
                return {
                    code: 1,
                    message: '登录成功',
                    data: {
                        username: 'dawei',
                        roles: ['admin'],
                        accessToken: 'dawei'
                    }
                };
            } else if (body.accessToken === 'common') {
                return {
                    code: 1,
                    message: '登录成功',
                    data: {
                        username: 'common',
                        roles: ['common'],
                        accessToken: 'common'
                    }
                };
            } else {
                return {
                    code: 0,
                    message: 'Token失效',
                    data: {
                        username: '',
                        roles: [],
                        accessToken: ''
                    }
                };
            }
        }
    }
] as MockMethod[];
