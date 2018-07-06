var http = require('http');

var url = require('url');

var jwt = require('jsonwebtoken');

var cert = "f45799819d864f4b8c26ccbbb4d68255";

http.createServer(function (req,res) {

    console.log(req.url);

    var token = url.parse(req.url).pathname;

    // console.log(token);

    token = token.slice(1);

    var ress = jwt.decode(token,{"cert":cert,algorithms:['HS256']});

    console.log(ress);

    res.writeHead(200,{"Content-Type":"text/javascript;charset=utf-8"});

    res.write(JSON.stringify(ress));

    res.end();

}).listen(8008);