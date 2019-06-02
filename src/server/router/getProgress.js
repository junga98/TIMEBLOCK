var express = require('express');
var router = express.Router();

var progressesModel = require('./../model/progress');

// 获取所有目标
router.get('/', (req, res) => {
  progressesModel.getProgress(req.query).then(
    function (doc) {
      // console.log(doc[0])
      res.send({
        data: doc[0].progresses
      })
    }
  )

})

module.exports = router;