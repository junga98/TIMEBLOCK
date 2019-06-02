var express = require('express');
var router = express.Router();

const userdata = require('./../config/db.js').userdataModel

router.get('/', (req, res) => {
  let date = new Date() // 当前日期年月日 输出结果> 20181222  
  let realDate = `${date.getUTCFullYear()}${date.getUTCMonth()+1}${date.getUTCDate()}`

  if (req.query.type == 'today') {
    let userName = req.query.userName
    userdata.findOne({
      "account": userName,
      "blocks.date": realDate
    }, {
      "blocks.$": 1
    }).exec(function (err, docs) {
      if (err) {
        res.send("出错啦" + err)
      } else {
        res.send(docs)
      }
    })
  } else {
    console.log("获取指定日期blocks");

    let userName = req.query.userName
    userdata.findOne({
      "account": userName,
      "blocks.date": req.query.type
    }, {
      "blocks.$": 1
    }).exec(function (err, docs) {
      if (err) {
        res.send("出错啦" + err)
      } else {
        res.send(docs)
      }
    })
  }
})
module.exports = router;