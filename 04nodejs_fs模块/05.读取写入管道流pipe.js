const fs = require('fs');//

// 创建可读流文件
var readerStream = fs.createReadStream('index.txt');

// 创建一个可写流

var writerStream = fs.createWriteStream('out.txt');

//管道读写操作 pipe
// 读取input.txt 文件内容， 并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log('写入成功');