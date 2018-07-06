//引入http模块
var http = require('http');

var url = require('url');

var ejs = require('ejs');

var fs = require('fs')

//引入扩展名的方法是在文件里面获取到的
// var router = require('./model/router');

http.createServer(function (req,res) {
    // router.statics(req,res,'static');

    res.writeHead(200,{"Content-Type":"text/html;charset = 'utf-8'"});

    // console.log(req.url);

    var pathname = url.parse(req.url).pathname;

    var method = req.method;


    if (pathname == '/login'){ //显示登录的页面


        var data = '你好获取到的数据';

        var list = ['111','2222','3333']

        ejs.renderFile('views/form.ejs',{
            msg:data,
            list:list
        },function (err, data) {


            res.end(data);

        })

        // res.end('login');
    }else if( pathname =='/dologin' && method=='POST'){ //执行登录操作
        console.log(method);
        // console.log(req.method); //获取get 还是post请求



        var postStr = '';

        req.on('data',function (chunk) {
            postStr+=chunk;

        });
        req.on('end',function (err,chunk) {

            console.log(postStr);
            // \n  是择行的意思
            fs.appendFile('login.txt',postStr+'\n', function (err) {
                if (err){
                    console.log(err);
                    return;
                }
            })
            // res.write()
            res.end("<script> alert('登录成功');history.back()</script>");
        })



    } else {

        ejs.renderFile('views/form.ejs',{

        },function (err, data) {

            res.end(data);

        })
    }


}).listen(8001);