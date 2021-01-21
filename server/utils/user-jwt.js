// 引入验证jsonwebtoken
const jwt = require('jsonwebtoken');
// 引入express-jwt
const expressJwt = require('express-jwt');
// 自定义的jwt密钥
const { PRIVATE_KEY } = require('./constant');
// const unless = require('express-unless');

// 验证token是否过期
const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  algorithms: ['HS256'],
  credentialsRequired: true,
  getToken: req => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    } if (req.query && req.query.token) {
      return req.query.token;
    }
  },
}).unless({
  path: ['/', '/api/login', '/login'],
});

// jwt-token解析
function decode(req) {
  const token = req.headers.authorization;
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  jwtAuth,
  decode,
};
