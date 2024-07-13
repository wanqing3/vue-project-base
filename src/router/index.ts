import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

/**
 * 公用404页面路由，介绍页about
 */
const commonRoutes: RouteRecordRaw[] = [
    {
        path: '/notFound',
        name: 'notFound',
        component: () => import('@/views/notFound/index.vue'),
        meta: {
            isMenu: false,
            parentRouter: ''
        },
        children: []
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: () => import('@/views/about/index.vue'),
        meta: {
            isMenu: false,
            parentRouter: ''
        },
        children: []
    }
];

/**
 * import.meta.glob 函数从文件系统导入多个模块:可用来配置路由，无需手动引入
 */
const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
    // false：默认懒加载模式  true：取消懒加载,立即全部导入
    eager: true
});
/**
 * 业务路由模块化配置
 */
const routes: RouteRecordRaw[] = [];
Object.values(modules).forEach(value => {
    //判断是否为空
    const route = value.default || [];
    const routeList = Array.isArray(route) ? [...route] : [route];
    routes.push(...routeList);
});
// 添加常规路由
routes.push(...commonRoutes);

/**
 * 创建路由实例对象
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 免校验路由
const noStatusPage = ['/login', '/notFound', '/about'];
/**
 * 路由守卫
 * 1.进度条功能
 * 2.登录验证
 */

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    const token = sessionStorage.getItem('userInfo');
    const userIsLogin = token ? true : false;
    // 已经登录 or 无需校验
    if (userIsLogin || noStatusPage.includes(_to.path)) {
        next();
    } else {
        next('/login');
    }
});
router.afterEach(_to => {
    NProgress.done();
});

export default router;
