var url = require('url');
//封装方法  改变end方法
function changeRes(res) {

    res.send = function(data){

        res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});

        res.end(data);
    }
}
var Server = function () {


    var G = this; //全局变量

    //处理get和post请求
    this._get = {};

    this._post = {};

    //处理get 和post方法

    var app = function (req,res) {
        changeRes(res);



        // console.log(method);

        var pathname = url.parse(req.url).pathname;

        if (!pathname.endsWith('/')){

            pathname = pathname + '/';

        };
        // console.log(pathname);
        //获取请求的方式

        var method = req.method.toLowerCase();

        if (G['_'+method][pathname]){
            // console.log(method);
            if (method == 'post'){//执行post请求
                console.log('123');
                var postStr = '';
                req.on('data',function (chunk) {
                    postStr += chunk;
                });
                req.on('end',function (err,chunk) {

                    req.query =postStr; //表示拿到post值

                    console.log(req.query);

                    G['_'+method][pathname](req,res);
                })

            }else if (method ==  'get') { //执行get请求
                G['_'+method][pathname](req,res); //执行方法
            }
        }else {
            res.end('no router')
        }

    };
    app.get = function(string,callback){
        // console.log(string);
        if (!string.endsWith('/')){
            string = string+ '/';
        }
        if (!string.startsWith('/')){
            string = '/'+string
        }

        G._get[string] = callback;
    };
    app.post = function(string,callback){

        if (!string.endsWith('/')){
            string = string+ '/';
        }
        if (!string.startsWith('/')){
            string = '/'+string
        }
        console.log(string+'123');
        G._post[string] = callback;
    };
    return app;
};
module.exports = Server();