


var fs= require('fs');

//node.js 有很多内置事件，我们可以通过引用events模块，并通过实例化EventEmitter类来绑定和监听事件
var events = require('events');

var EventEmitter = new events.EventEmitter();



 exports.getMime = function(extname) { //获取后缀名的方法
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

         EventEmitter.emit('get_mime', stats)
     });
 };

// 同步执行

