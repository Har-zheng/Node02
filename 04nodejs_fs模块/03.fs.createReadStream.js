const  fs = require('fs');

var fileReadStream = fs.createReadStream('index.txt');


//流的方式读取文件
str = '';
count = 0;
fileReadStream.on('data', function (chunk) {
    str+=chunk;
    count++;
});
//获取结束
fileReadStream.on('end', function (chunk) {
    console.log(str);
    console.log(count);
});

//获取失败
fileReadStream.on('err', function (chunk) {
    console.log(err);
});

//  写入文件数据

// console.log('程序执行完成');





