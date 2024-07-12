import { createRouter,createWebHashHistory } from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 配置路由
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页'
        },
        children: []
    }
];

/**
 * 创建路由对象
 */
const router = createRouter({
    history:createWebHashHistory(),
    routes
});

/**
 * 路由守卫
 */
router.beforeEach((_to,_from,next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
