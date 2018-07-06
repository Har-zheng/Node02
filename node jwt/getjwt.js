
var request = require('request');

var jwt = require('jsonwebtoken');

var api = "/identity/get_signature?sid=18336048620";   // 接口地址

var server = "http://192.168.0.99:7001";  // 服务器地址和端口

var url = server + api;             // 拼接请求的url

var user_name = "x_user";

var user_password = "123455";

var user_sex = "male";

var args = {

    "user_name": user_name,
    "user_password": user_password,
    "user_sex": user_sex
};

var signature = "2c66c030a3f540a3abf5798fcc7a1de9";   // 从服务器获取的用于加密的签名.

var algorithm = "HS256";   // 从服务器端获取的加密算法
var payload = jwt.sign(args, signature, {"algorithm": algorithm});

request.post(url, {"payload": payload}, function(res,req,body){

    console.log(body);

    var result = JSON.parse(body);  // 返回结果是json,转成字典

    console.log(result);

    var message = result['message'];
    // var data = result['data']

    if( message == 'success'){
        // 请求成功.
        var data = result['data'];  // 取出数据载荷

        console.log(data);
    }
    else{
        // 请求失败
        var error_reason = message;
        console.log(error_reason);  // 弹出错误提醒
    }

});
