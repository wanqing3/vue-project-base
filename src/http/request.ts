import axios from 'axios';




/**
 * axios 请求实例
 */
const service = axios.create({
    // 环境变量中改变 axios 的 baseURL
    baseURL : import.meta.env.VITE_APP_USE_MOCK === 'true' ? import.meta.env.VITE_APP_MOCK_BASEURL : import.meta.env.VITE_APP_API_BASEURL,
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
