/// <reference types="vite/client" />

// 每次添加完新的环境变量就在此添加一次ts类型,在使用 import.meta.env 时能获得ts语法提示
interface ImportMetaEnv {
    readonly VITE_APP_USE_MOCK: string;
    readonly VITE_APP_MOCK_BASEURL: string;
    readonly VITE_APP_API_BASEURL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
