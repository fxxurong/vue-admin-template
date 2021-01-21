// 导入统一的请求接口
import request from '@/utils/request';

// 登陆接口
export const login = param => {
  return request({
    url: '/login',
    method: 'post',
    data: param,
  });
};

// 获取用户信息接口
export const getInfo = param => {
  return request({
    url: '/info',
    method: 'get',
    data: param,
  });
};

// 登出接口
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  });
}

// 获取用户列表
export function userlist() {
  return request({
    url: '/userlist',
    method: 'get',
  });
}

// 添加新用户
export function addUser(data) {
  return request({
    url: '/addUser',
    method: 'post',
    data,
  });
}

// 删除用户接口
export function deluser(data) {
  return request({
    url: '/delUser',
    method: 'post',
    data,
  });
}

// 更新用户状态（函数方法）
export function updatestatus(data) {
  return request({
    url: '/updatestatus',
    method: 'post',
    data,
  });
}
