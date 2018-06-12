var fs = require('fs');
exports.getMime = function (fs, extname) {//获取后缀名的方法

    //把读取数据改成同步
    var data  = fs.readFileSync('./mime.json');
    //data.tostring()  json对象转换成json字符串

    var Mimes = JSON.parse(data.toString());

    return Mimes[extname] || 'text/html';


}