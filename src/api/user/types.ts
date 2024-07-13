/**
 * 用户登录请求参数
 */
export interface ILoginRequest {
    username: string;
    password: string;
}
/**
 * 登录后返回的响应信息
 */
export interface ILoginResponse {
    username: string;
    roles: string[];
    accessToken: string;
}
