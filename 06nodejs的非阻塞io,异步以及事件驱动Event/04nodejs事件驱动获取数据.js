var fs = require('fs');

//引入events事件
var events = require('events');

//实例化EventEmitter 来绑定监听事件

var EventEmitter = new events.EventEmitter();

var events = require('events');

function getMime() {

    fs.readFile('mime.json',function (err,data) {
        EventEmitter.emit('data',data);
    });
};
getMime();

EventEmitter.on('data',function (mime) {

    console.log(mime.toString())

});