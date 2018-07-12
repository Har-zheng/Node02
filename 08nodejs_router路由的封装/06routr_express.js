

var G = {};
var http = require('http');

var url = require('url');

var app = function (req,res) {
    var pathname = url.parse(req.url).pathname;
    if (!pathname.endsWith('/')){
        pathname = pathname + '/';
    }
    console.log(pathname);
    if (G[pathname]){
        G[pathname](req,res);
    }else {
        res.end('no router')
    }
};

//定义一个get方法
app.get = function (string,callback) {

};


//只要有请求触发app这个方法

http.createServer(app).listen(3000);


//注册login方法
app.get('login',function (req,res) {
    res.end('login')
})
//注册register方法
app.get('register',function (req,res) {
    res.end('register')
})

