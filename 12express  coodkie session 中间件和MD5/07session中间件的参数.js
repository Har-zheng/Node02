/*
 1,安装  express-session

 2,引入
 var session = require("express-session");
var MongoStore = reuire("connet-mongo")(session);

 3,设置官方文档提供的中间件
app.use(session({
    secret: "keyboard cat",
    resave:false,
    saveUnintialized: true
}));
4, 使用

req.session.username = 'zhangsan';

获取值req.session.username

  */
var express = require("express");
var app = express();
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

app.use(session({
    secret:'keyboard cat', // 可以随便写
    resave: false, //表示  强制保存session  即使没有变化
    name: 'session_id', // 保存在本地cookie的一个名字 默认sonnect.sid  可以不设置
    saveUninitialized: true,/*强制将未初始化的session 存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态
       在设定一个cookie前，这对于登录验证，减轻服务端存储压力，权限控制是有帮助的。(默认：true)。  建议手动添加。
    */
    cookies:{
        secure:true,
        maxAge:1000 // 设置过期时间
    }, /* secure http这样的情况才可以访问cookie*/
    rolling:true,// 在每次请求时强制设置cookie，这将重置cookie过期时间（默认false）

    store:new MongoStore({
        url: 'mongodb://127.0.0.1:27017/sessions',  //数据库的地址
        touchAfter: 24 * 3600 //time period in seconds 通过这样 设置
    })
}));
app.get("/",function (req,res) {
    // res.send('首页');
    if(req.session.userinfo){ //获取
        res.send('你好！'+ req.session.userinfo+ '欢迎回来！')
    }else {
        res.send('未登录！')
    }
});

app.get("/login",function (req,res) {
    req.session.userinfo = "zhz1111"; // 设置session
    res.send('登录成功！');
});
app.get("/loginout",function (req,res) {
    // req.session.cookie.maxAge =0 //改变cookie过期时间  退出登录
    req.session.destroy();
    res.send('退出登录成功！');
});
app.get("/news",function (req,res) {
    //获取session
    if(req.session.userinfo){
        res.send("你好！"+req.session.userinfo+'欢迎回来！');
    }else {
        res.send('未登录！');
    }
});
app.listen(3000);

