
var fs= require('fs');

 exports.getMime = function(extname,callback) { //获取后缀名的方法
//异步执行
     fs.readFile( './mime.json',function (err,stats) {

         if(err){
             console.log('mime.json//文件不存在');
             return false;
         };
         // console.log(stats);
         // console.log(stats,toString());

         var Mimes=  JSON.parse(stats.toString());



         var result = Mimes[extname]||'text/html';

         callback(result);
     });
 };

// 同步执行

