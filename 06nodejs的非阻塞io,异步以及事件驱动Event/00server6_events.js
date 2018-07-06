
var http = require('http');   //引入http模板

// console.log(http);
var fs = require('fs');

// path  node.js提供的模块

var path = require('path');

//获取url模块
var url = require('url');


var mimeModel = require('./model/getmimefromfile_events');

// console.log(mime.getMime('.html')) //获取文件类型

//引入监听事件
var events = require('events');

//node.js 有很多内置事件 ，我们可以通过引用events模块，并通过实例化EventEmitter来绑定和监听

var EventEmitter = new events.EventEmitter();

console.log(EventEmitter);



http.createServer(function(req,res){

     // console.log(res);

     // var pathname = req.url;

     var pathname = url.parse(req.url).pathname;

     console.log(pathname);

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

             } else {//返回的参数  及方法  也就是这个文件

                 var mime = mimeModel.getMime(EventEmitter,extname);//调用获取数据的方法

                 EventEmitter.on('get_mime',function (stats) {
                     console.log('66');
                     console.log(stats);
                     res.writeHead(200,{"Content-Type":""+stats+";charset = 'utf-8'"});
                     // res.write(data);
                     res.end(data);//结束响应
                 });
             }
         });

     }


 }).listen(8002);

