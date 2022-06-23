
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
path: '/',
name: 'Login',
meta: {
title: '登录',
keepAlive: true,
requireAuth: false
 },
component: () => import('../pages/login.vue')
 },
 {
path: '/Steward',
name: 'Steward',
meta: {
title: '资讯管家',
keepAlive: true,
requireAuth: true
 },
component: () => import('../pages/Steward.vue')
 },
 {
path: '/jd',
name: 'JD',
props: route => ({ query: route.query.id}),
meta: {
title: '京东详情',
keepAlive: true,
requireAuth: false
 },
component: () => import('../pages/JD.vue')
},
 {
path: '/bk',
name: 'BK',
props: route => ({ query: route.query.id}),
meta: {
title: '贝壳详情',
keepAlive: true,
requireAuth: false
 },
component: () => import('../pages/BeiKe.vue')
},
{
  path: '/wb',
  name: 'WB',
  props: route => ({ query: route.query.id}),
  meta: {
  title: '微博详情',
  keepAlive: true,
  requireAuth: false
   },
  component: () => import('../pages/WeiBo.vue')
  },
]

const router = createRouter({
history: createWebHistory(),
routes
});
export default router;

