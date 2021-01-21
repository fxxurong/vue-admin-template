import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

Vue.use(Router);

// const createRouter = () =>
//   new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }), // 路由滚动方式
//     routes,
//   });
// // 创建路由实例充createRouter（）
// const router = createRouter();

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes,
});


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 导出一个路由重置函数
export function resetRouter() {
  // const newRouter = createRouter();
  const newRouter = router();
  router.matcher = newRouter.matcher; // reset router
}
// 导出路由
export default router;
