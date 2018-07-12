var Server = function () {

    var url = require('url');

    var G = this; //全局变量

    //处理get和post请求
    this._get = {};
    this._post = {};

    //处理get 和post方法

    var app = function (req,res) {


        //获取请求的方式

        var method = req.method.toLowerCase();

        console.log(url);

        var pathname = url.parse(req.url).pathname;

        if (G['_'+method][pathname]){
            
            if (method ==  'psot'){//执行post请求
                var postStr = '';
                req.on('data',function (chunk) {
                    postStr += chunk;
                });
                req.on('end',function (err,chunk) {
                    req.query =postStr; //表示拿到post值
                    console.log(postStr);
                })

            }else { //执行get请求
                G['_'+method][pathname](req,res); //执行方法
            }
        }

    };
    app.get = function(string,callback){

        if (!string.endsWith('/')){
            string = string+ '/';
        }
        if (!string.startsWith('/')){
            string = '/'+string
        }
        G._get[string] = callback;
    }
    app.post = function(string,callback){

        if (!string.endsWith('/')){
            string = string+ '/';
        }
        if (!string.startsWith('/')){
            string = '/'+string
        }
        G._post[string] = callback;
    }
    return app;
};
module.exports = Server();