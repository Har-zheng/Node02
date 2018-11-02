//  安装 express
// ejs 安装


// var bodyParser = require('body-parser'); //  处理post的请求 获取


// //设置body-parser中间件
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.use(bodyParser.json());
/*
//图片上传使用的插件
   //1 npm install multiparty
    //2 var multiparty = require('multiparty');
    //3 上传图片的地方
var form = new multiparty.Form();
form.uploadDir ='upload'  上传图片保存的地址
form.parse(req, function(err, fields, files) {
    //获取提交的数据以及图片上传成返回
});
4 html 页面 from表单加入 enctype="multipart/form-data"
*/
var express = require('express');

var app = new express(); // 实例化
// 既可以获取提交的数据   也可上传图片
var multiparty = require('multiparty');

var fs = require('fs');

//数据库操作
var  DB = require('./modules/db.js')

var session = require("express-session");
//  配置中间件  固定格式

var  md5 = require("md5-node");
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000*60*30
  },
    rolling:true
}));

// 使用ejs模板引擎 默认找views这个目录
app.set('view engine', 'ejs');
//配置 public 目录为我们的静态资源目录
app.use(express.static('public'));
// 配置虚拟目录  upload /  图片地址
app.use('/upload',express.static('upload'))



// 自定义中间件 判断登录状态
// esj 中设置全局数据  所有的页面都可以使用
// app.locals['userinfo'] ='123'
// app.locals['userinfo'] = '111111';

// app.use(function(req,res,next) {
//     console.log(req.url);
//     if (req.url == '/login' || req.url =='/doLogin'){
//         console.log('abs');
//         // console.log(req.session);
//         next();
//     }else {
//         if ( req.session.userinfo && req.session.userinfo.username != '' ){
//             app.locals['userinfo'] = req.session.userinfo; //配置全局变量  全局使用
//             console.log(req.session);
//             next();
//         } else {
//             console.log('absssssss');
//             console.log(req.session);
//             res.redirect('/login');
//         }
//     }
// });

app.get('/',function (req,res){
    //res.send('index');
});
// 登录
app.get('/login',function (req,res){
    // res.send('login');
    res.render('login');
});
// 销毁session
app.get('/loginOut',function (req,res){
    // res.send('login');
    // res.render('login');
    req.session.destroy(function (err) {
        if (err){
            console.log(err);
        } else {
            res.redirect('/login');
        }
    })
});
// 获取登录提交的数据
app.post('/doLogin',function (req,res){
    // res.send('login');
    // console.log(req.body); //获取提交的数据
 // req.body = { username: '123456', password: 'qqqqqqrrrrrrrrrr' }
    //  1获取数据
    // 2  连接数据库
    console.log(req.body);
    var username = req.body.username;

    var password = md5(req.body.password);/* 要对用户输入的密码加密*/
    DB.find('user',{
        username:username,
        password:password
    },function (err,data) {
        console.log(data)
        if ( data.length >=1 ) {
            console.log('登录成功');
            // 保存用户信息
            req.session.userinfo = data[0];
            res.redirect('/product'); //登录成功跳转 列表页面
            console.log(req.session);


        }else {
            // console.log("登录失败");
            res.send("<script >alert('登录失败！');location.href = '/login'</script>")
        }
    });


    // MongoClient.connect(DbUrl,function(err, client){
    //     if (err){
    //         console.log(err);
    //         return
    //     } else {
    //
    //     }
    //     // console.log(db);
    //     //查询数据collection 3.0新写法
    //     var db = client.db('productmanage');
    //     var result = db.collection('user').find({
    //         username:username,
    //         password:password
    //     });
    //
    //     //  另一种遍历数据的方法
    //     result.toArray(function(err,data) {
    //         // console.log(data);
    //         if (data.length >=1 ) {
    //             console.log('登录成功');
    //             // 保存用户信息
    //             req.session.userinfo = data[0];
    //             res.redirect('/product'); //登录成功跳转 列表页面
    //             console.log(req.session);
    //
    //
    //         }else {
    //             // console.log("登录失败");
    //             res.send("<script >alert('登录失败！');location.href = '/login'</script>")
    //         }
    //         client.close();
    //     })
    //
    //
    //     //第一种方法
    // /*    var list = [];
    //     result.each(function(error, doc) {
    //         if (error){
    //             console.log(error);
    //         } else {
    //             if (doc!=null){
    //                 list.push(doc);
    //             }else {
    //                 console.log(list);
    //                 // console.log(result);
    //             }
    //         }
    //     });
    //     */
    //
    // });

});

// 商品列表
app.get('/product',function (req,res){
    //链接数据库查询数据
    DB.find('product',{},function (err,data) {
        res.render('product',{
            list:data
        })
    })
});
//显示增加商品的页面
app.get('/productadd',function (req,res){
    // res.send('productadd增加商品');
    res.render('productadd');

});
// 获取表单提交的数据， 以及post过来的图片
app.post('/doProductAdd',function (req,res) {
    //获取表单提交的数据， 以及post过来的图片
    var form = new multiparty.Form();
    form.uploadDir ='upload',  //上传图片保存的地址 目录必须存在
    form.parse(req, function(err, fields, files) {
        //获取提交的数据以及图片上传成返回
        // console.log(fields); //获取表单的数据
        // console.log(files); // 图片上传成功 返回的信息
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var pic = files.pic[0].path;
        // console.log(pic);
        DB.isnert('product',{
            title:title,
            price:price,
            fee,
            description,
            pic
        },function (err,data) {
            if (!err){
                res.redirect('/product'); //上传成功跳转到首页
            }
        })
    });
    
});
//  执行修改的
app.post('/doproductEdit',function (req, res) {
    //获取表单提交的数据， 以及post过来的图片
    var form = new multiparty.Form();
    form.uploadDir ='upload',  //上传图片保存的地址 目录必须存在
        form.parse(req,function (err,fields,files) {
            //获取提交的数据以及图片上传成功 返回的图片信息
            var _id = fields._id[0]; // 修改的条件
            var title = fields.title[0];
            var price = fields.price[0];
            var fee = fields.fee[0];
            var description = fields.description[0];
            var originalFilename = files.pic[0].originalFilename;
            var pic = files.pic[0].path;

            if (originalFilename) {
                var  setData = { //修改了图片
                    title,
                    price,
                    fee,
                    description,
                    pic
                }
            }else {
                var  setData = { //未修改了图片
                    title,
                    price,
                    fee,
                    description
                };
                //删除生成的临时文件
                fs.unlink(pic,function () {});
            }

            DB.update('product',{"_id": new DB.ObjectID(_id)},setData,function (err,data) {
                if (!err){
                    res.redirect('/product')
                }
            })
        })
})
app.get('/productedit',function (req,res){
    // res.send('productedit编辑商品');
    var id = req.query.id;

    // var id = mongoose.Types.ObjectId(id)
    // 去数据库查询这个id 对应的数据  获取自增长的id  要用"_id":new DB.ObjectID(id)}
    DB.find('product',{ "_id": new DB.ObjectID(id) },function (err,data) {
       // console.log(data);
        res.render('productedit',{
            list: data[0]
        })
    });

    // res.render('productedit');
});
app.get('/productdelete',function (req,res){
    //获取id
    var id = req.query.id

    DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function (err,data) {
        if (!err){
            res.redirect('/product');
        }
    });
});

app.get('/delete',function (req,res) {
    // res.send('删除失败');
    DB.deleteOne('product',{"title":"iphone8"},function (error,data) {
        if(error){
            console.log("删除失败");
        }else {
            res.send('删除数据成功')
        }
    })
});
app.listen(3003);