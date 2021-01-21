// 每次页面加载permission都会运行检查用户权限状态
import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // 页面顶部进度条插件
import 'nprogress/nprogress.css'; // 进度条插件式样
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar 启动进度条
  NProgress.start();

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title);

  if (getToken()) {
    // 如果有token
    if (to.path === '/login') {
      // 如果已经登陆而且是登陆页，则重新定向到首页
      next({ path: '/' });
      NProgress.done();
    } else {
      // 判断是否有用户信息
      const hasGetUserInfo = store.getters.name;
      // 如果用户信息存在就可以进入页面
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // 用户信息不存在则去获取信息
          await store.dispatch('user/getInfo');
          // 获取成功则进入页面
          next();
        } catch (error) {
          // 获取用户信息失败 则删除会话信息并跳转到登陆页面
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* 没有token */

    // eslint-disable-next-line no-lonely-if
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是白名单 则可以进入页面
      next();
    } else {
      // 非白名单，则跳转到登陆页面.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar 完成进度条加载
  NProgress.done();
});
