
var MongoClient = require('mongodb').MongoClient;

var DBurl = 'mongodb://localhost:27017/itying';  //连接数据库地址

var http = require('http');



var app = require('./model/express-router');

var url=require('url'); /*引入url模块*/


var ejs = require('ejs');

http.createServer(app).listen(3000);
app.get('/',function (req,res) {//执行登录
    // console.log("login");
    msg = '这是数据库的数据'
    ejs.renderFile('views/new.ejs',{mag:msg},function (err,data) {

        res.send(data)
    });
});
app.get('/add',function (req, res) {
    //增加数据
    // , { useNewUrlParser: true }
    MongoClient.connect(DBurl,function (err,db) {
        if (err){
            console.log(err);
            console.log('数据库连接失败');
            return
        }
        //增加数据

        db.collection('user').insertOne({

            "name":"大地",
            "age":60

        },function (error,result) {
            if (error){
                console.log('增加数据失败');
                return
            }
            res.send('增加数据成功！+succes');

            db.close(); //关闭数据库
        });
    });
});
app.get('/edit',function (req, res) {
    MongoClient.connect(DBurl,function (err,db) {
        if (err){
            console.log(err);
            console.log('连接数据库失败');
            return;
        }
        db.collection('user').updateOne({"names":"大地"},{$set:{"age":40}},function (error,result) {
            if (error){
                console.log('修改数据失败');
                return
            }
            res.send('修改数据成功！+succes');

            db.close(); //关闭数据库
        })
    })
})
app.get('/delete',function (req,res) {
    //删除数据
    //delete?names=大地
    // console.log(url.parse(req.url).query);
    var query = url.parse(req.url).query;
    MongoClient.connect(DBurl,function (err, db) {
        if (err){
            console.log(err);
            console.log('连接数据库失败');
            return;
        }
        db.collection('user').deleteOne({"names":"nodejs"},function (error,result) {
            if (error){
                console.log(error);
                console.log('删除数据失败');
                return;
            }
            res.send('删除数据成功！');

            db.close();
        })
    })


})