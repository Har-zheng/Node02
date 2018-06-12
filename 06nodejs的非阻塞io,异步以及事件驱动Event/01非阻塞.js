

var fs = require('fs');

// //非阻塞
// console.log('1');
//
// fs.readFile('./mime.json',function (err,data) {
//
//     console.log(data);
//     console.log('2');
//
// });
// console.log('3')


function getMime() {
    //1
    fs.readFile('mime.json',function (err,data) {
        // console.log(data.toString());
        return 123;    //3
    });
      //2
    // return  false;
};
getMime();
console.log(getMime());