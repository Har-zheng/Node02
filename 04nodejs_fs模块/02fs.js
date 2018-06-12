//1.判断服务器上面有没有upload目录，没有就创建这个目录。（图片上传）

var  fs =require('fs');
// fs.stat('upload', function (err,stats) {
//     if(err){ //没有这个目录
//         fs.mkdir('upload',function (errs) {
//             if (errs) {
//                 console.log(errs);
//             };
//             console.log('创建成功');
//             return;
//         });
//     }else {
//         console.log('存在这个目录');
//         console.log(stats.isDirectory());
//         console.log(stats)
//     }
//
// });


//2.找出html目录下面的所有的目录，然后打印出来
//错误写法


// fs.readdir('html',function (err,files) {
//     if (err){
//         console.log(error);
//     }else{//判断是目录还是文件夹
//         // console.log(files);//数组
//
//         for (var i = 0; i<files.length;i++){
//             console.log(files[i]);
//
//             fs.stat(files[i],function (error,stats) { //循环判断是目录还是文件 --  异步  方法错误
//                 console.log(files[i]);
//             })
//         }
//
//     }
// })
//  异步操作
// for (var i = 0; i<5; i++){
//     // console.log(i);
//     setTimeout(function () {
//         console.log(i)
//     },100)
// }

//正确方法
var filesArr = [];
fs.readdir('html',function (err,files) {
    if (err){
        console.log('不是一个目录');
    } else {//是目录情况下

        (function getFile(i) {
            if (i==files.length){
                console.log('目录');
                console.log(filesArr);//打印所有循环的目录
                return false;
            }
            fs.stat('html/'+ files[i],function (error,stats) {
                if (error){//循环出  不符合要求的
                    console.log(error);
                } else if(stats.isDirectory){//目录
                    filesArr.push(files[i]);
                    console.log(files[i]);
                }
//              递归调用
                getFile(i+1)

            });
        })(0)

    }
})