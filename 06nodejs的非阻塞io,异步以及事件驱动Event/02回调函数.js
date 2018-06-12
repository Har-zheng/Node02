var  fs = require('fs');

function getMime(callback) {

    fs.readFile('mime.json',function (err,data) {

        // console.log(data.toString());

        // return data;    //3

        callback(data)
        
    });
};
getMime(function (result) { //回调函数
    
    console.log(result.toString());

});

