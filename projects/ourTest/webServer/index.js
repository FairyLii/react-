const express = require('express');
var fs = require('fs'); //用来读取文件
const app = express();
const port = 3000;
const host = 'http://127.0.0.1';
const root="web/testbase64";

app.get('/', (req, res) => res.send('Hello World!'));

    app.listen(port, host, () => {
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});