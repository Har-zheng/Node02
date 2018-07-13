


var http = require('http');


var app = require('./model/express-router');

var ejs = require('ejs');

http.createServer(app).listen(3000);
app.get('/',function (req,res) {//执行登录
    // console.log("login");
    msg = '这是后台数据'
    ejs.renderFile('views/new.ejs',{mag:msg},function (err,data) {

        res.send(data)
    });
});
app.get('/login',function (req,res) {//执行登录
    // console.log("login");
    ejs.renderFile('views/form.ejs',{},function (err,data) {
        res.send(data)
    });
});
app.get('/register',function (req,res) {
    console.log(res.body); //获取post传过来的数据
    res.send('register');
});
app.post('/news',function (req,res) {

    res.send('新闻数据');
});
app.post('/dologin',function(req,res) {

    console.log(req.query); //获取post传过来的数据

    res.send("<script>alert('请求成功！');history.back()</script>");
});