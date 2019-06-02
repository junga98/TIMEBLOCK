var express = require('express');
var router = express.Router();

var presetsModel = require('./../model/presets');

// 获取所有预设
router.get('/', (req, res) => {
  presetsModel.getPreset(req.query).then(
    function (doc) {
      // console.log(doc[0])
      res.send({
        data: doc[0].presets
      })
    }
  )

})

module.exports = router;