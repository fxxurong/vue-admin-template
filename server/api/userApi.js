const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { decode, jwtAuth } = require('../utils/user-jwt');
const md5 = require('../utils/md5');
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant');

router.use(jwtAuth);

const $sql = require('../db/sqlMap');

// 连接数据库
const conn = mysql.createConnection(models.mysql);
conn.connect();

// 所有用户列表
router.get('/userlist', (req, res) => {
  // const { username } = decode(req) || {};
  const { userlist } = $sql.user;
  conn.query(userlist, (err, data) => {
    res.send({
      code: 20000,
      data,
    });
  });
});

// 返回用户信息
router.get('/info', (req, res) => {
  // 解析token 并且token存在
  const { username } = decode(req) || {};
  const getInfo = $sql.user.finduserbyusername;
  conn.query(getInfo, username, (err, info) => {
    // eslint-disable-next-line no-shadow
    const { roles, introduction, avatar, name, email } = info[0];
    res.send({
      code: 20000,
      data: {
        roles: [roles],
        introduction,
        avatar,
        name,
        email,
      },
    });
  });
});

// 登陆接口
router.post('/login', (req, res) => {
  const login = req.body;
  const finduser = $sql.user.finduserbyusername;
  conn.query(finduser, login.username, (err, user) => {
    if (err) {
      throw err;
    }
    if (user.length === 0) {
      res.send({ message: '没有这个用户' });
    } else {
      const {
        username,
        password,
        name,
        avatar,
        roles,
        introduction,
        status,
      } = user[0];
      if (status === '停用') {
        res.send({ message: '这个用户已停用' });
      } else {
        bcrypt.compare(login.password, password, (err, result) => {
          if (err) {
            throw err;
          }
          const token = jwt.sign({ username }, PRIVATE_KEY, {
            expiresIn: JWT_EXPIRED,
          });
          // eslint-disable-next-line no-unused-expressions
          result
            ? res.send({
                code: 20000,
                data: {
                  token,
                  avatar,
                  name,
                  roles,
                  introduction,
                },
              })
            : res.send({ message: '密码错误' });
        });
      }
    }
  });
});

// 删除用户接口
// eslint-disable-next-line no-unused-vars
router.post('/delUser', (req, res) => {
  const { username } = req.body;
  const delUser = $sql.user.deluserbyusername;
  conn.query(delUser, username, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send({ message: '成功删除用户', code: '20000', data: 'success' });
  });
});

// 登出接口
router.post('/logout', (req, res) => {
  res.send({
    code: 20000,
    data: 'success',
  });
});

//  添加用户接口
router.post('/addUser', (req, res) => {
  // 第一步验证用户名是否存在
  const validUsername = req.body.username;
  const finduser = $sql.user.finduserbyusername;
  conn.query(finduser, validUsername, (err, user) => {
    if (err) {
      throw err;
    }
    if (user.length === 0) {
      const newUser = req.body;
      const { addUser } = $sql.user;
      const saltRounds = 10;
      bcrypt.hash(newUser.password, saltRounds, hash => {
        conn.query(
          addUser,
          [newUser.username, newUser.name, hash, newUser.email, newUser.roles],
          (err, result) => {
            if (err) {
              throw err;
            }
            console.log(result);
            res.send({ message: '添加用户成功', code: 20000 });
          }
        );
      });
    }
  });
});

// 更新用户状态
router.post('/updatestatus', (req, res) => {
  const { status, username } = req.body;
  const { updatestatus } = $sql.user;
  conn.query(updatestatus, [status, username], err => {
    if (err) {
      throw err;
    }
    res.send({ message: '修改成功', code: 20000 });
  });
});

// 显示指定数量样板资料
router.get('/sampleList', (req, res) => {
  const { samplelist } = $sql.user;
  conn.query(samplelist, (err, data) => {
    if (err) {
      throw err;
    }
    res.send({
      code: 20000,
      data,
    });
  });
});

module.exports = router;
