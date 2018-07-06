//引入http模块
var http = require('http');

var url = require('url');

var fs = require('fs');

var model = require('./model/model');

//引入扩展名的方法是在文件里面获取到的
// var router = require('./model/router');

http.createServer(function (req,res) {
    // router.statics(req,res,'static');

    res.writeHead(200,{"Content-Type":"text/html;charset = 'utf-8'"});

    var pathname = url.parse(req.url).pathname.replace('/','');

    if (pathname !== 'favicon.ico'){
        
        try {

            model[pathname](req,res);

        } catch (err) {

            model['home'](req,res);

        }
        
    }


}).listen(8001);