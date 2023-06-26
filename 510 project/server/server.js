const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var auth = require("./auth");
var account = require("./account");
var msg = require("./message");
const port = 4000;

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "content-type,Authorization,token");
    res.header('Access-Control-Allow-Origin', '*');
    res.set({ 'Content-Type': 'application/json' });
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});

app.use('/auth', auth);
app.use('/account', account);
app.use('/*', (req, res) => {
    res.status(404).send(msg.error('invalid request！'));;
});

let server = http.createServer(app);
server.listen(port, () => {
    console.log(`app listening on port ${port}`)
})