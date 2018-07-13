var express = require('express');

var app =new express();
//配置express 模板引擎
app.set('view engine','ejs');

//设置模板的位置
app.set('views',__dirname + '/views');

//中间件app.use

//express.static('public')给 public目录下的文件提供静态web服务

app.use(express.static('public'));

//views默认会在这个文件里面找模板
app.get('/',function (req, res) {

    // res.send('ejs的演示');

    //ejs渲染模板
    res.render('index');
});

app.get('/news',function (req, res) {

    // res.send('ejs的演示');

    var arr = ['111','222','333']
    //ejs渲染模板
    res.render('news',{
        list:arr
    })
});


//端口大于3000
app.listen('3001','127.0.0.1');