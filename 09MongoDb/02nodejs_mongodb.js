
var MongoClient = require('mongodb').MongoClient; //引入数据库

var DBurl = 'mongodb://localhost:27017/itying';  //连接数据库地址

var http = require('http');

var app = require('./model/express-router');

var url=require('url'); /*引入url模块*/


var ejs = require('ejs');

http.createServer(app).listen(3000);
app.get('/',function (req,res) {//执行登录

    MongoClient.connect(DBurl,function (err, db) {
        if (err){
            console.log(err);
            console.log('连接失败');
        }

        var results = db.collection('user').find({});
        // console.log(results);

        var list = [];

        results.each(function (error,doc) {
            // console.log(doc);
            if (error){
                console.log(error);
                console.log('数据失败');
            }else {
                if (doc !== null){
                    list.push(doc);
                    // console.log(list)
                }else { //null 表示数据循环完成

                    console.log(list)

                }
            }
        })


    })


    // // console.log("login");
    // msg = '这是数据库的数据'
    // ejs.renderFile('views/new.ejs',{mag:msg},function (err,data) {
    //
    //     res.send(data)
    // });
});
app.get('/add',function (req, res) {
    MongoClient.connect(DBurl,function (err, db) {
        if (err){
            console.log(err);
            console.log('增加失败')
        }
        db.collection('user').insertOne({
            "name":"lcl"
        },function (error, result) {
            res.send('成功！++')
        })
    })
});


