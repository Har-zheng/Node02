//引入http模块var http = require('http');var url = require('url');var ejs = require('ejs');//引入扩展名的方法是在文件里面获取到的var router = require('./model/router');http.createServer(function (req,res) {    // router.statics(req,res,'static');    res.writeHead(200,{"Content-Type":"text/html;charset = 'utf-8'"})    console.log(req.url);    var pathname = url.parse(req.url).pathname;    if (pathname == '/login'){        var data = '你好获取到的数据';        var list = ['111','2222','3333']        ejs.renderFile('views/login.ejs',{            msg:data,            list:list        },function (err, data) {            res.end(data);        })        // res.end('login');    }else if (pathname == '/register'){        var h2 = '<p>简单输出</p>'        var  msg = '这是一个注册页面';        ejs.renderFile('views/register.ejs',{            msg:msg,            h2: h2        },function (err,data) {            res.end(data);        })        res.end('register');    } else if (pathname == '/order'){        res.end('order');    } else {        res.end('index')    }    }).listen(8001);