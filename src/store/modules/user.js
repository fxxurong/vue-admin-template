import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
  };
};

const state = getDefaultState();

// 状态改变器
const mutations = {
  // 重置状态
  // eslint-disable-next-line no-shadow
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  // 设置名称
  SET_NAME: (state, name) => {
    state.name = name;
  },
  // 设置头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  // 设置权限组
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};
// 设置操作
const actions = {
  // user login 用户登陆
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password })
        .then(response => {
          const { data } = response;
          // 设置token
          commit('SET_TOKEN', data.token);
          // 设置cookies,这里调用的是src/utils/auth.js文件的setToken方法
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;
          if (!data) {
            return reject('Verification failed, please Login again.');
          }
          // 后端返回的信息进行修改
          const { name, avatar, roles } = data;
          commit('SET_NAME', name);
          commit('SET_ROLES', roles);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // 必须首先移除token
          resetRouter(); //重置路由
          commit('RESET_STATE'); //重置状态信息
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token 重置token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
