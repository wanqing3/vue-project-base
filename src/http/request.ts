import axios from 'axios';


/**
 * axios 请求实例
 */
const service = axios.create({
    baseURL : '/',
    // 请求超时时间(ms)
    timeout : 1000 * 15
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default service;
