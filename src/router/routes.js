/* Layout 引入布局页面 */
import Dashboard from '@/views/dashboard';
import Login from '@/views/login';
import Layout from '@/layout'; // 引入layout插件（组件）
import Samplelist from '@/views/samplelist';
import Sampledev from '@/views/sampledev';
import Sampledetail from '@/views/sampledetail';
import Customer from '@/views/customer';
import Factory from '@/views/factory';
import Profile from '@/views/profile';
import Userlist from '@/views/user/userlist';
import Userpermissions from '@/views/user/userpermissions';
import Userroles from '@/views/user/userroles';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const routes = [
  {
    // 登陆界面
    path: '/login', // 地址栏显示的登陆界面路径
    component: Login, // 引入登陆界面页面文件
    hidden: true, // 隐藏选项
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout, // 使用layout插件（组件）
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: '控制台',
        component: Dashboard,
        meta: { title: '控制台', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/',
    component: Layout,
    redirect: '/samplelist',
    name: 'sample',
    meta: { title: '样版管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'samplelist',
        name: 'SampleList',
        component: Samplelist,
        meta: { title: '样版列表', icon: 'el-icon-picture' },
      },
      {
        path: 'sampledetail',
        name: 'Sampledetail',
        component: Sampledetail,
        meta: { title: '样版资料', icon: 'table' },
      },
      {
        path: 'sampledev',
        name: 'SampleDev',
        component: Sampledev,
        meta: {
          title: '样版开发',
          icon: 'el-icon-s-opportunity',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'user',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'userlist',
        name: 'UserList',
        component: Userlist,
        meta: { title: '用户列表', icon: 'tree', roles: ['editor'] },
      },
      {
        path: 'userroles',
        name: 'userroles',
        component: Userroles,
        meta: { title: '用户规则', icon: 'table' },
      },
      {
        path: 'userpermissions',
        name: 'userpermissions',
        component: Userpermissions,
        meta: { title: '用户权限', icon: 'tree' },
      },
    ],
  },

  {
    path: '/factory',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'factory',
        component: Factory,
        meta: { title: '工厂管理', icon: 'el-icon-s-tools' },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { title: '用户资料', icon: 'user' },
      },
    ],
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'customer',
        component: Customer,
        meta: {
          title: '客户管理',
          icon: 'el-icon-s-custom',
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

export default routes;
