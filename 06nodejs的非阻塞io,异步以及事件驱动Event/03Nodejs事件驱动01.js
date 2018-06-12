//  Node.js是单线程应用程序，是通过事件和回调函数支持并发，所以性能非常高
//Node.js 的每一个api都是异步的，并作为一个单独立线程运行，使用异步函数调用，并处理并发。

//Node.js 有多个内置事件，我们可以通过引用events模块，并通过实例化EventEmitter类来绑定和监听事件，

//  引入events模块

var events = require('events');

console.log(events)


var  EventEmitter = new events.EventEmitter();

//广播  和接受广播

//监听广播to——parent的广播
EventEmitter.on('to_parent',function (data) {

    console.log('接收到了广播事件');

    EventEmitter.emit('to_mime','给mime发送的数据')


})
//监听广播to_mime的广播
EventEmitter.on('to_mime',function (data) {
    console.log(data);

});


setTimeout(function () {
    console.log('开始广播了');
    //广播 to——parent 的时间
    EventEmitter.emit('to_parent', '发送的苏据');

},1000);






