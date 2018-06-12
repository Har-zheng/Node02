
var http = require('http');   //引入http模板

// console.log(http);
var fs = require('fs');

// path  node.js提供的模块

var path = require('path');


var mimeModel = require('./model/getmime');

// console.log(mime.getMime('.html')) //获取文件类型

http.createServer(function(req,res){

    // console.log(res);
    var pathname = req.url;

    //获取文件名后缀
    var extname = path.extname(pathname);

    if (pathname=='/'){
        pathname = './index.html';//默认加载的首页
    }
    if (pathname!='/favicon.ico'){//过滤请求favison.ico

        console.log(pathname);

        //文件操作获取 static 下面的index.html
        fs.readFile('static/' + pathname,function (err,data) {
            if (err){//没有这个文件

                console.log('404');
                fs.readFile('static/404.html',function (error,data404) {
                     res.writeHead('404',{"Content-Type":"text/html;charset='utf-8'"});
                     res.write(data404);
                     res.end();//结束响应
                });

            } else {
                var mime = mimeModel.getMime(extname);

                res.writeHead(200,{"Content-Type":""+mime+";charset = 'utf-8'"});
                res.write(data);
                res.end();//结束响应
            }
        });

    }


}).listen(8002);

