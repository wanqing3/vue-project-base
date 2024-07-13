import { post } from '@/http/request';
import { ILoginRequest, ILoginResponse } from './types';

/**
 * 用户登录
 * @param data
 * @returns
 */
export const userLogin = async (data?: ILoginRequest) => {
    return post<ILoginResponse>({ showMessage: true }, '/login', data);
};
