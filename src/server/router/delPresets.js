var express = require('express');
var router = express.Router();

var presetsModel = require('./../model/presets');

// 新增预设
/* router.post('/api/addPresets', (req, res) => {
  presetsModel.addPreset(req.body).then(
    function () {
      res.send("新增成功")
    }
  )
}) */

// 删除预设
router.delete('/', (req, res) => {

  console.log(req.query);
  presetsModel.delPreset(req.query).then(
    function () {
      res.send("删除成功")
    }
  )
})

// 获取所有预设
/* router.get('/api/getPresets', (req, res) => {
  presetsModel.getPreset(req.query).then(
    function (doc) {
      // console.log(doc[0])
      res.send({
        data: doc[0].presets
      })
    }
  )

}) */

module.exports = router;