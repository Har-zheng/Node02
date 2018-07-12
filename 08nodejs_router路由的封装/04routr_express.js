var app = function () {
    console.log('App')
};
app();
app.get = function () {
    console.log('app.get');
};
app.post = function () {
    console.log('app.post');
}
app.get();
app.post();