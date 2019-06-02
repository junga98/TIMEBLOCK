var express = require('express');
var router = express.Router();

var progressesModel = require('./../model/progress');

// 新增目标
router.post('/', (req, res) => {
  progressesModel.addProgress(req.body).then(
    function () {
      res.send("新增成功")
    }
  )
})

module.exports = router;