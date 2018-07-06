//引入http模块
var http = require('http');

var url = require('url')

//引入扩展名的方法是在文件里面获取到的
var router = require('./model/router');

http.createServer(function (req,res) {
    // router.statics(req,res,'static');

    console.log(req.url);
    var pathname = url.parse(req.url).pathname;

    if (pathname == '/login'){
        res.end('login');
    }else if (pathname == '/register'){
        res.end('register');
    } else if (pathname == '/order'){
        res.end('order');
    } else {
        res.end('index')
    }

    
}).listen(8001);