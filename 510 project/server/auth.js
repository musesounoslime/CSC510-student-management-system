const express = require('express');
var router = express.Router();
var { exec, sql, transaction } = require("./connect-db");
var msg = require("./message");
const jwt = require('jsonwebtoken');
const jwtKey = 'timeTabler';


router.post('/signup', async (req, res) => {
    try {
        if (!req.body.userName || !req.body.password) {
            res.send(msg.error('username or password cannot be empty.'));
            return;
        }
        let selectResult = await exec(sql.table('user').where({ userName: req.body.userName }).select());
        if (selectResult.length === 0) {
            let data = await exec(sql.table('user').data({ userName: req.body.userName, password: req.body.password }).insert());
            if (data) {
                res.send(msg.success({}, 'signup success!'));
            }
        } else {
            res.send(msg.error('User already exists!'));
        }
    } catch (e) {
        res.send(msg.error());
    }
});


router.post('/login', async (req, res) => {
    try {
        if (!req.body.userName || !req.body.password) {
            res.send(msg.error('username or password cannot be empty.'));
            return;
        }
        var token = jwt.sign({ userName: req.body.userName }, jwtKey);
        let result = await exec(sql.table('user').where({ userName: req.body.userName, password: req.body.password }).select());
        if (result.length === 0) {
            res.send(msg.error('Wrong username or password'));
            return;
        }
        let data = await exec(sql.table('user').data({ token }).where({ id: result[0].id }).update());
        data.changedRows ? res.send(msg.success({ token, isAdmin:result[0].isAdmin, userName: result[0].userName })) : res.send(msg.error('Login exception！'));
    } catch (e) {
        res.send(msg.error());
    }
});


module.exports = router;