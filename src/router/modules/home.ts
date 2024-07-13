import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/home/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;