import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

/**
 * response.data响应数据结构
 */
interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
}
/**
 * 自定义请求配置，添加 showMessage 属性
 */
interface IExtendAxiosRequestConfig extends AxiosRequestConfig {
    showMessage?: boolean;
}

/**
 * axios 请求实例
 */
const service = axios.create({
    // 环境变量中改变 axios 的 baseURL
    baseURL:
        import.meta.env.VITE_APP_USE_MOCK === 'true'
            ? import.meta.env.VITE_APP_MOCK_BASEURL
            : import.meta.env.VITE_APP_API_BASEURL,
    // 请求超时时间(ms)
    timeout: 1000 * 15
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * 响应拦截器
 * response.data 后端返回数据
 */
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // http状态码 = 200
        if (response.status === 200) {
            // 走二次拦截器then
            return response;
        }
        // http状态码 = 2xx
        ElMessage({
            type: 'error',
            message: getMessageInfo(response.status)
        });
        // 走二次拦截器catch
        return Promise.reject(new Error(`HTTP Error: ${response.status}`));
    },
    (error: AxiosError) => {
        const { response } = error;
        // 捕获约定错误信息，http状态码不在2xx的范围
        if (response) {
            ElMessage({
                type: 'error',
                message: getMessageInfo(response.status)
            });
            return Promise.reject(response.data);
        }
        ElMessage({
            type: 'error',
            message: '网络连接异常,请稍后再试!'
        });
        console.error('response failed:', error);
        return Promise.reject(error);
    }
);

/**
 * 二次响应拦截:为响应数据进行定制化处理
 * BaseResponse 为 response.data 的类型
 * T 为 response.data.data 的类型
 * @param config
 * @returns
 */
const requestInstance = <T = any>(config: IExtendAxiosRequestConfig): Promise<BaseResponse<T>> => {
    const { showMessage = false, ...otherConfig } = config;
    return service
        .request<any, AxiosResponse<BaseResponse<T>>>({ ...otherConfig })
        .then((response: AxiosResponse<BaseResponse<T>>) => {
            // 后端返回结构体 BaseResponse
            const res = response.data;

            // 如果res.code为错误代码返回message信息
            if (res.code !== 1) {
                const error = new Error(res.message);
                ElMessage({
                    type: 'error',
                    message: res.message
                });
                // 拒绝并返回错误数据,走下方catch
                return Promise.reject(error);
            }

            // 如果需要显示消息，则显示成功消息
            if (showMessage) {
                ElMessage({
                    type: 'success',
                    message: res.message
                });
            }

            // 返回响应数据
            return res;
        })
        .catch((error: any) => {
            // 添加更详细的错误信息或日志记录
            console.error('Request failed:', error);
            // 根据需要，可以进一步处理错误或将其转换为特定的错误对象
            return Promise.reject(error);
        });
};

/**
 * 发送 GET 请求
 *
 * @param config 请求配置对象
 * @param url 请求地址
 * @param params 请求参数
 * @returns 返回一个 Promise 对象，解析后得到 BaseResponse<T> 类型的结果
 */
export function get<T = any, U = any>(
    config: IExtendAxiosRequestConfig, // 请求配置对象
    url: string,
    params?: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: 'GET', params });
}

/**
 * 发送 POST 请求
 *
 * @param config 请求配置对象
 * @param url 请求地址
 * @param data 请求参数
 * @returns 返回 Promise<BaseResponse<T>> 类型的对象
 */
export function post<T = any, U = any>(
    config: IExtendAxiosRequestConfig, // 请求配置对象
    url: string,
    data?: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: 'POST', data });
}

/**
 * 使用PUT方法发送请求
 *
 * @param config 请求配置对象
 * @param url 请求的URL地址
 * @param params 请求参数
 * @returns 返回Promise<BaseResponse<T>>类型的结果，其中T为响应数据的类型
 */
export function put<T = any, U = any>(
    config: IExtendAxiosRequestConfig, // 请求配置对象
    url: string,
    params?: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: 'PUT', params });
}

/**
 * 发送 DELETE 请求
 *
 * @param config 请求配置对象
 * @param url 请求地址
 * @param data 请求参数
 * @returns 返回 Promise 对象，包含请求结果的 T 类型数据和基础响应信息
 */
export function del<T = any, U = any>(
    config: IExtendAxiosRequestConfig, // 请求配置对象
    url: string,
    data?: U
): Promise<BaseResponse<T>> {
    return requestInstance({ ...config, url, method: 'DELETE', data });
}

export default service;
