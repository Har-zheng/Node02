
/*

*/
var express = require('express');//引入

var app = new express(); //实例化

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser('sign'));



//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine','ejs');

app.get('/',function (req, res) {
    console.log(req.cookies);
    res.send('您浏览过的城市'+ req.cookies.citys);
});

app.get('/lvyou',function (req, res) {
    var city = req.query.city; //  当前的一个城市
    var citys = req.cookies.citys; // 获取当所有城市
//  循环遍历是否存在    若存在不需要 添加
//
    if(citys){
        for (var i=0; i<citys.length - 1; i++){
            if (citys[i] == city){
                console.log(citys.length);
                return;
            } else {
                citys.push(city);
            }
        }
    }else {
        citys = [];// 没有浏览过任何城市的话 citys 改为数组
        citys.push(city);
    }
    res.cookie('citys',citys,{ maxAge:60*100*10 });
    console.log(req.signedCookies);// 获取加密的信息
    res.send('您浏览过的城市是'+ city);
});
app.get('/set',function (req, res) {
    // 参数1： 名字
    // 参数2：cookie的值
    // 参数3： cookie的配置信息
    console.log(req.cookies);
    res.cookie('username','cookie222',{maxAge:600000,signed:true});
    res.send('设置cookie成功')
});
app.listen(3000,'127.0.0.1');