//路由中间件

var express = require('express');//引入

var app = new express(); //实例化

//中间件：就是匹配路由之前和匹配路由之后的一系列的操作

//权限判断：没有登录  跳转到登录页面

//内置中间件 托管静态页面
//http://localhost:3000/css/style.css

app.use(express.static('public'));

app.use('/static',express.static('public'));

app.use(function (req,res,next) {
    console.log(new Date());
    next();
})

app.get('/',function (req, res) {
    res.send('你好express');
});
app.get('/index',function (req, res) {
    res.send('你好express');
});
app.get('/news',function (req, res,next) {
    console.log('这是路由中间件');
    next();
});
app.get('/news',function (req, res) {
    console.log('news')
    res.send('这是路由中间件news');
});
app.use(function (req, res) {
    res.status(404).send('这是404表示没有匹配到的路由')
});
app.listen(3000,'127.0.0.1');