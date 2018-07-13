var express = require('express');//引入express

var app = new express(); // 实例化

app.get('/',function (req,res) {
    res.send('你好express');
});
app.get('/news',function (req, res) {
    res.send('news')
});
app.get('/login',function (req, res) {
    res.send('登录模块')
});
app.get('/register',function (req, res) {
    res.send('注册模块')
});

//post
app.post('/dologin',function (req, res) {
    res.send('news')
});

//动态路由 http://localhost:3000/newscontent/333
app.get('/newscontent/:aid',function (req, res) {

    //获取动态路由的传值
    console.log(req.params)
    var aid = req.params.aid;

    res.send('newscontent模块'+aid)
});

//获取get传值    http://localhost:3000/product?name=123&cid=666&age=20
app.get('/product',function (req,res) {

    //获取动态路由的传值
    console.log(req.query);

    var aid = req.query;

    res.send('product'+req.query.name+'+'+req.query.cid)
});

app.listen(3000,'127.0.0.1');