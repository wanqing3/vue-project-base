import { fileURLToPath, URL } from 'node:url';
import { defineConfig,loadEnv } from 'vite';
import type { ConfigEnv,UserConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
export default defineConfig(({mode}:ConfigEnv):UserConfig => {
    // 获取当前工作目录
    const root = process.cwd();
    // 获取当前环境
    const env = loadEnv(mode, root);
    return {
        // 项目根目录
        root,
        // 开发或生产环境服务的公共基础路径
        base:'/',
        // 无需处理的静态资源位置,可直接路由访问
        publicDir : fileURLToPath(new URL('./public',import.meta.url)),
        // 需要处理的静态资源位置
        assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)),
        // 扩展插件
        plugins :[
            // Vue模板文件编译插件
            vue(),
            // jsx文件编译插件
            vueJsx(),
            // 开启mock服务器
            viteMockServe({
                // 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
                mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
                enable: true // 本地开发是否启用
            }),
        ],
        // 运行后本地预览的服务器
        server: {
            // 是否开启https
            // https: false,
            // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
            host: true,
            // 开发环境预览服务器端口
            port: 9000,
            // 启动后是否自动打开浏览器
            open: false,
            // 是否开启CORS跨域
            cors: true,
            // 代理服务器
            // 帮助我们开发时解决跨域问题
            proxy: {
                // 以/api开头发送的请求都会被转发到 http://localhost:8000 一般为后端同事的ip地址
                [env.VITE_APP_API_BASEURL]: {
                    target: 'http://localhost:8000',
                    // 改变 Host Header
                    changeOrigin: true
                    // 发起请求时将 '/api' 替换为 ''
                    //rewrite: (path) => path.replace(/^\/api/, ""),
                },
                // 以/mock/api开头发送的请求都会被转发到 http://localhost:9000
                [env.VITE_APP_MOCK_BASEURL]: {
                    target: 'http://localhost:9000',
                    // 改变 Host Header
                    changeOrigin: true
                    // 发起请求时将 '/mock/api' 替换为 ''
                    //rewrite: (path) => path.replace(/^\/mock\/api/, ""),
                }
            }
        },
        // 打包配置
        build: {
            // 关闭 sourcemap 报错不会映射到源码
            sourcemap: false,
            // 打包大小超出 400kb 提示警告
            chunkSizeWarningLimit: 400,
            rollupOptions: {
                // 打包入口文件 根目录下的 index.html(也就是项目从哪个文件开始打包)
                input: {
                    index: fileURLToPath(new URL('./index.html', import.meta.url))
                },
                // 静态资源分类打包
                output: {
                    format: 'esm',
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
            }
        },
        // 配置别名
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '#': fileURLToPath(new URL('./types', import.meta.url))
            }
        }
    };
})
