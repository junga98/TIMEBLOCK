var express = require('express');
var router = express.Router();

var presetsModel = require('./../model/presets');

// 新增预设
router.post('/', (req, res) => {
  presetsModel.addPreset(req.body).then(
    function () {
      res.send("新增成功")
    }
  )
})

module.exports = router;