import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
        parentRouter: ''
    },
    redirect: '/home',
    children: [
        {
            path: '/home',
            name: 'HomePage',
            component: () => import('@/views/home/index.vue'),
            meta: {
                isMenu: true,
                title: '默认首页',
                parentRouter: 'Layout'
            },
            children: []
        },
        {
            path: '/parent',
            name: 'ParentPage',
            meta: {
                isMenu: true,
                title: '父级菜单',
                parentRouter: 'Layout'
            },
            children: [
                {
                    path: '/parent/child1',
                    name: 'ChildPage1',
                    component: () => import(/* webpackChunkName: "project" */ '@/views/parent/child-one.vue'), // 内联注释，实现懒加载
                    meta: {
                        isMenu: true,
                        title: '子菜单1',
                        parentRouter: 'ParentPage'
                    },
                    children: []
                },
                {
                    path: '/parent/child2',
                    name: 'ChildPage2',
                    component: () => import(/* webpackChunkName: "project" */ '@/views/parent/child-two.vue'), // 内联注释，实现懒加载
                    meta: {
                        isMenu: true,
                        title: '子菜单2',
                        parentRouter: 'ParentPage'
                    },
                    children: []
                },
                {
                    path: '/parent/child3',
                    name: 'ChildPage3',
                    component: () => import(/* webpackChunkName: "project" */ '@/views/parent/child-three.vue'), // 内联注释，实现懒加载
                    meta: {
                        isMenu: true,
                        title: '子菜单3',
                        parentRouter: 'ParentPage'
                    },
                    children: []
                }
            ]
        }
    ]
} as RouteRecordRaw;
