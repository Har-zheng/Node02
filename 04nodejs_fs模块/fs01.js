//
var fs = require('fs');
 // 1.fs.stat 检测是文件还是目录
 fs.stat('html',function (err,stats) {
     if (err){
         console.log(err);
         return false;
     }
     console.log('文件'+stats.isFile());
     console.log('目录'+stats.isDirectory());
 })
//2,fs.mkdir  创建目录

// fs.mkdir('css',function (err) {
//     if (err){
//         console.log(err);
//         return false;
//     }
//     console.log('创建目录成功')
// })

// 3,fs.writeFile 创建写入文件
// fs.writeFile('t.txt','你好你哦的.js', 'utf8',function (err) {
//     if (err){
//         console.log(err);
//
//         return false;
//     }
//     console.log('写入成功')
// })
//4.fs.appendFile 追加文件
// fs.appendFile('t1.txt','你好node.js//6/n','utf8',function (err) {
//     if (err){
//         console.log(err);
//         return false;
//     }
//     console.log('写入成功')
// });
//5.fs.readFile 读取文件
// fs.readFile('t1.txt',function (err,data) {
//     if (err){
//         console.log(err);
//         return false;
//     }
//     console.log(data.toString())
// })
//6.fs.readdir读取目录
// fs.readdir('html',function (err,data) {
//     if (err){
//         console.log(err);
//     }
//     console.log(data)
// })
//fs.rename  重命名
// fs.rename('html/css','html/js',function (err) {
//     if (err){
//         console.log(err);
//         return false;
//     };
//     console.log('重命名成功');
// })
// fs.rename('html/style.css','html/css/basic.css',function (err) {
//     if(err){
//         console.log(err);
//         return false;
//     };
//     console.log('剪切成功');
// });
//8.fs.rmdir 删除目录  rmdir只能删除目录
// fs.rmdir('html/t',function (err) {
//     if (err){
//         console.log(err);
//         return false;
//     };
//     console.log('删除成功');
// })
//9.fs.unlink  删除文件
// fs.unlink('index.txt',function (err) {
//     if (err){
//         console.log(err);
//         return false;
//     }
//     console.log('删除文件成功');
// })
