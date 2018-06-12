const  fs = require('fs');
var data = '我是要写入的数据，node很好玩哦\n';
//要写入的文件  也就是创建写入流文件
var writeStream = fs.createWriteStream('out.txt');

//for  循环载入多条数据
for (var i = 0; i<=100;i++){
    //写入文件的规范
    writeStream.write(data,'UTF-8');
}
// 检测写文件末尾
writeStream.end();

writeStream.on('finish',function () {// finish  所有数据已被写入到底层系统时触发
    console.log('写入完成');

});

writeStream.on('err',function (error) {
    console.log(error.stack);
});