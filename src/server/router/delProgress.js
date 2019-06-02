var express = require('express');
var router = express.Router();

var progressesModel = require('./../model/progress');

// 删除目标
router.delete('/', (req, res) => {
  progressesModel.delProgress(req.query).then(
    res.send("删除成功")
  )
})

module.exports = router;