var G = {};
var app = function () {
    console.log('App');
    if (G['login']){
        G['login'](req,res);
    }
};
app();
//定义一个get方法
app.get = function (string,callback) {
    G[string] = callback;
    console.log('app.get');
};

//执行get方法
app.get('login',function (req,res) {
    console.log('login')
});

setTimeout(function () {
    app('res','req')
},1000);
