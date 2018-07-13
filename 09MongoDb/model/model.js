
var ejs = require('ejs');

var fs = require('fs');


var app = {
    // login
    login:function (req,res) {

        console.log('login');
        ejs.renderFile('views/form.ejs',{},function (err,data) {
            res.end(data);
        });
        
        res.end('login');

    },
    register:function (req, res) {

        console.log('register');
        res.end('register');
    },
    home:function (req, res) {

        console.log('home');

    },
    dologin: function (req, res) {

        var postStr = '';

        req.on('data',function (chunk) {
            postStr+=chunk;

        });
        req.on('end',function (err,chunk) {

            console.log(postStr);
            // \n  是择行的意思
            fs.appendFile('login.txt',postStr+'\n', function (err) {
                if (err){
                    console.log(err);
                    return;
                }
            })
            // res.write()
            res.writeHead(200,{"Content-Type":"text/html;charset = 'utf-8'"});
            res.end("<script> alert('登录成功');history.back()</script>");
        })
    }
};
 // app.login();
 //
 // app['login']();


module.exports = app;