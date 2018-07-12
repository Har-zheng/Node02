var route = require('./model/http-route');

var app = route();

var http = require('http');

var server = http.createServer(app);

app.get('/login',function (req,res) {
    res.send('login');
});

app.get('/register',function (req, res) {
    res.send('register');
});

app.post('/text',function (req, res) {
    console.log('POST',req.query);
    res.send(req.query);
});
server.listen(8080, function () {
    console.log('listen'+ server.address().port);
});
