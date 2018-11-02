// body-parser 中间件
// 第三方的
// 获取 post 提交的数据
// 1.cnpm install body-parser --save
// 2.var bodyParser = require('body-parser')
// 3.设置中间件
// //处理 form 表单的中间件// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// form 表单提交的数据
// // parse application/json
// app.use(bodyParser.json());
// 提交的 json 数据的数据
// 4.req.body 获取数据
// 5 ,获取coolies   req.cookies


// baid.con 域名

// aa.com
//www.aa.com
//news.aaa.com
// domain: 'aaa.com' 多个域名共享cookie
 //path  表示在哪个路由下面可以访问cookie
//httpOnly: true 表示只有在none环境下访问cookie
//让用户看不到cookie保存的明文信息
 //1保存cookie 加密
// cookie-parser 里面 signed 属性设置成true   表示加密cookie

/*//  1 参数表示加密的随机字符串
        app.use(cookieparser('sign');
     2 s设置
     res.cookie（"username" , '设置cookie的value的值'，{maxAge：60000}，signed：true）
    3.使用
    req.signedCookieds  获取加密的cookie

*/
var express = require('express');//引入

var app = new express(); //实例化

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser('sign'));



//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine','ejs');
app.get('/',function (req, res) {
    console.log(req.signedCookieds);
    res.send('你好express');

});

app.get('/news',function (req, res) {
    console.log(req.signedCookies);// 获取加密的信息

    res.send('你好express news');

});

app.get('/set',function (req, res) {
    // 参数1： 名字
    // 参数2：cookie的值
    // 参数3： cookie的配置信息
    console.log(req.cookies);
    res.cookie('username','cookie222',{maxAge:600000,signed:true});
    res.send('设置cookie成功')
});
app.get('/login',function (req, res) {
    res.render('login');
});
app.post('/doLogin',function (req,res) {
    console.log(req.body); //获取post传输数据
});


app.listen(3000,'127.0.0.1');