var express = require('express');
var router = express.Router();

var presetsModel = require('./../model/presets');

router.get('/', (req, res) => {
  console.log(req.query)
  res.send("获取当月blocks成功")
})

module.exports = router;