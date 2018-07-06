var http = require('http');

var fs = require('fs')

var request = require('request');

var url = require('url');

var jwt = require('jsonwebtoken');

var crypto = require('crypto');

var  cert = '';

var server = "http://192.168.0.99:7001"; //服务器地址和端口

var signature = null;

var algorithim = "HS256";

var user_name = "jack";

var user_password = "123456";

function get_md5(data){
    // 获取一个对象的md5值
    return crypto.createHash('md5').update(data).digest("hex");
}
var args = {
    "user_name": user_name,
    "user_password": get_md5(user_password)
};

// console.log(crypto)
// 客户端在进行加密通讯之前,需要通过此接口获取服务器的数字签名和算法.
function  datas(cb) {
    var api = "/identity/get_signature?sid=18336048620"; //接口地址及参数

    var url_as = server + api;
    if(signature == null){
        request.post(url_as,args,function (res,req,body) {

            var result = JSON.parse(body); //返回结果是JSON,转成字典

            var message = result['message'];
            if (message == 'success'){
                //请求成功
                var data = result['data'];//取出数据载荷
                signature = data['signature'];
                console.log(data);
                cb(signature, algorithim);  // 执行登录函数
            }
        });
    }
    else{
        cb(signature, algorithim);  // 执行登录函数
    }

}

function company_login(signature, algorithm) {

    var url_login = 'http://192.168.0.99:7001' + '/web/login_company';

    var signature = signature;//从服务器获取的用于加密的签名.

    var algorithm = algorithm; //从服务器获取的加密算法

    console.log(signature);

    var payload = jwt.sign(args,signature, {"algorithm":algorithm,noTimestamp: true});

    console.log({"payload": payload});

    var pd = {"payload": payload};

    var json_parse = { url: url_login , form: pd};

        // console.log({"url_login": url_login});
        // console.log({"payload": payload});
        request.post(json_parse, function(res,req,body){

            var result = JSON.parse(body);  // 返回结果是json,转成字典

            console.log(result);

            var message = result['message'];
            // var data = result['data']

            if( message == 'success'){
                // 请求成功.
                var data = result['data'];  // 取出数据载荷
                return data;
                console.log(data);
            }
            else{
                // 请求失败
                var error_reason = message;
                console.log(error_reason);  // 弹出错误提醒
            }

        });



}


datas(company_login);



// http.createServer(function (req,res,data) {
//     console.log(data);
//
//     fs.readFile('./login.html',function (err,data) {
//
//         if (err){//没有这个文件
//
//             console.log('404');
//
//         } else {
//
//             console.log('存在');
//
//             res.writeHead(200,{"Content-Type":"text/html;charset = 'utf-8'"});
//
//             res.write(data);
//
//             // console.log(data);
//
//             res.end();//结束响应
//         }
//     });
//
//     // console.log(req.url);
//     //
//     // var  cert = '2c66c030a3f540a3abf5798fcc7a1de9';
//     //
//     // var token = urls.parse(req.url).pathname;
//     //
//     // // console.log(token);
//     //
//     // token = token.slice(1);
//     //
//     // var ress = jwt.decode(token,{"cert":cert,algorithms:['HS256']});
//     //
//     // console.log(ress);
//     //
//     // res.writeHead(200,{"Content-Type":"text/javascript;charset=utf-8"});
//     //
//     // res.write(JSON.stringify(ress));
//     //
//     // res.end();
//
// }).listen(8001);
