var express = require('express');//引入

var app = new express(); //实例化

//中间件：就是匹配路由之前和匹配路由之后的一系列的操作

//权限判断：没有登录  跳转到登录页面

//中间件   表示匹配任何路由  应用级路由
// next()  路由继续向下匹配
app.use(function (req,res,next) {
    console.log(new Date());
    next();
});
app.use( '/news',function (req,res,next) {
    console.log('新闻路由');
    next();
})
app.get('/',function (req, res) {
    res.send('你好express');
});
app.get('/index',function (req, res) {
    res.send('你好express');
});
app.get('/news',function (req, res) {
    res.send('新闻路由');
})
app.listen(3000,'127.0.0.1');