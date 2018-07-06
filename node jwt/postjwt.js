/*一个不需要加密的请求的例子*/
var request = require('request');
var jwt = require("jsonwebtoken");
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

function datas(callback){

    request.post(url, args, function(res,req,body){

        console.log(callback);

        var result = JSON.parse(body);  // 返回结果是json,转成字典

        // console.log(result);

        var message = result['message'];
        // var data = result['data']

        if( message == 'success'){
            // 请求成功.
            var data = result['data'];  // 取出数据载荷
            console.log(data);

            callback(data);
        }
        else{
            // 请求失败
            var error_reason = message;
            console.log(error_reason);  // 弹出错误提醒
        }

    });
};
function callback(data){
    console.log(data)
}
datas(callback)
// function get_secret(arg){
//     console.log("callback is success!");
//     console.log(arg);
//     secret = args['signature'];
// };
//
// var req2 = function (args){
//
//     console.log("secret is "+ secret);
//
//     var payload = jwt.sign(args, secret, {algorithm: algorithm});
//
//     var data = {"payload": payload};
//
//     var url = 'http://192.168.99:7001/web/login_company';
//     request.post(url, data, function(res,req,body){
//
//         // console.log(res);
//         // console.log(req);
//         console.log(body);
//
//     });
// };
//
// function send_req(){
//     var user_name = "x_user";
//     var password = '123455';
//     var x = {"user_name": user_name, "password": password};
//     req2(x);
// };
// send_req();



// request('http://192.168.0.99:7001/web/login_company', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // 打印google首页
//     }
// })
