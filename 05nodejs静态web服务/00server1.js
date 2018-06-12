
var http = require('http');   //引入http模板

// console.log(http);
var fs = require('fs');

http.createServer(function(req,res){

    // console.log(res);
    var pathname = req.url;
    if (pathname=='/'){
        pathname = './index.html';//默认加载的首页
    }
    if (pathname!='/favicon.ico'){//过滤请求favison.ico
        console.log(pathname);
        //文件操作获取 static 下面的index.html
        fs.readFile('static/'+pathname,function (err,data) {
            if (err){//没有这个文件
                console.log('404');
            } else {
                res.writeHead(200,{"Content-Type":"text/html;charset = 'utf-8'"});
                res.write(data);
                res.end();//结束响应
            }
        });

    }


}).listen(8002);

