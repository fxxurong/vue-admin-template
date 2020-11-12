const express = require("express"); //引入express
const app = express();  //实例一个express对象

app.use(require('cors')()); //解决跨域
app.use(express.json()); //express处理json数据
