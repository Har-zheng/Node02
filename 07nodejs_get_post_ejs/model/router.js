//fs模块
var fs  = require('fs');
//path 模块
var path = require('path');
//url 模块
var url = require('url');



//获取文件类型的方法 私有
function getMime(extname,callback) { //获取后缀名的方法
//异步执行
    fs.readFile( './mime.json',function (err,stats) {

        if(err){
            console.log('mime.json//文件不存在');
            return false;
        };

        var Mimes=  JSON.parse(stats.toString());
        var result = Mimes[extname]||'text/html';

        callback(result)
    });
};

  exports.statics = function (req,res,staticpath) {

      // console.log(res);

      // var pathname = req.url;

      var pathname = url.parse(req.url).pathname;//获取url的值

      console.log(pathname);

      //获取文件名后缀
      var extname = path.extname(pathname);

      if (pathname=='/'){

          pathname = './index.html';//默认加载的首页
      }

      if (pathname!='/favicon.ico'){//过滤请求favison.ico

          console.log(pathname);

          //文件操作获取 static 下面的index.html
          fs.readFile(staticpath+'/' + pathname,function (err,data) {

              if (err){//没有这个文件

                  console.log('404');
                  fs.readFile(staticpath+'/404.html',function (error,data404) {
                      res.writeHead('404',{"Content-Type":"text/html;charset='utf-8'"});
                      res.write(data404);
                      res.end();//结束响应
                  });

              } else {//返回的参数  及方法
                  getMime(extname,function(result){

                      res.writeHead(200,{"Content-Type":""+result+";charset = 'utf-8'"});
                      res.write(data);
                      res.end();//结束响应

                  });


              }
          });

      }
  };