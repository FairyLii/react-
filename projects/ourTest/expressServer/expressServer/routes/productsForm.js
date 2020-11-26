var express = require('express');
var router = express.Router();
const  clientList = require('../data/clientsList');
const  address  = require('../data/address');
const  phone  = require('../data/phoneNumber');

//用户的地址列表
router.get('/getAddressListAboutClient', (req, res) => {
    res.send(res.json(address));
});
// 用户列表
router.get('/getClientList', (req, res) => {
    res.send(res.json(clientList));
});
router.get('/getPhoneNumberAboutClient', (req, res) => {
    res.send(res.json(phone));
});


module.exports = router;