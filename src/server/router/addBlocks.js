var express = require('express');
var router = express.Router();

const userdata = require('./../config/db.js').userdataModel
const blocksModel = require('./../model/blocks.js')

router.post('/', (req, res) => {
  console.log(req.body);
  let params = req.body

  let TimeId = params.TimeId // 时间
  let userName = params.userName

  /*   let blockTime = `blocks.$.block${TimeId}` // 无法使用字符串替换
    console.log(blockTime); */
  console.log(params.time);

  let newBlock = {
    id: params.BlockId,
    name: params.BlockName,
    time: params.time,
    blockWidth: params.BlockWidth,
    color: params.BlockColor
  }

  let date = new Date() // 当前日期年月日 输出结果> 20181222  
  let realDate = `${date.getUTCFullYear()}${date.getUTCMonth()+1}${date.getUTCDate()}`

  /*   在db.userdatas.blocks{ }中查找【是否存在】当前日期date(20181222)的对象
     【存在】 往对象"20181222" 的"blocks.$.{TimeId}" 添加newBlock，返回blocks{ }
     【不存在】 在blocks中新增对象键"20181222" ，往新增对象中的"block${TimeId}" 添加newBlock，返回blocks{ } */

  userdata.findOne({
    "account": userName,
    "blocks.date": realDate // 查找该用户的文档
  }, (err, docs) => {
    if (err) { // 输出错误
      console.log("Error:" + err)
      res.send(err)
    } else {
      // console.log(docs);
      if (docs != '' && docs != null) { // 如果存在则返回对于键值的文档
        console.log("存在该日期的文档")

        if (TimeId == "1") {
          blocksModel.addBlocksTime1(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "2") {
          blocksModel.addBlocksTime2(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "3") {
          blocksModel.addBlocksTime3(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "4") {
          blocksModel.addBlocksTime4(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "5") {
          blocksModel.addBlocksTime5(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "6") {
          blocksModel.addBlocksTime6(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "7") {
          blocksModel.addBlocksTime7(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "8") {
          blocksModel.addBlocksTime8(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "9") {
          blocksModel.addBlocksTime9(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "10") {
          blocksModel.addBlocksTime10(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "11") {
          blocksModel.addBlocksTime11(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        } else if (TimeId == "12") {
          blocksModel.addBlocksTime12(userName, realDate, newBlock).exec(
            function (err, raw) {
              if (err) {
                res.send("新增失败,未知错误")
              } else {
                res.send("新增blocks成功")
              }
            }
          )
        }



      } else { // 如果不存在则新增一个键
        console.log("不存在该日期文档")

        userdata.update({ // 1.在blocks对象数组中新增一个{data: realDate}对象
          "account": userName,
        }, {
          "$push": {
            "blocks": {
              date: realDate
            }
          }

        }).exec(function (err, doc) { // 在1完成后
          if (err) {
            res.send("出错啦")
          } else { // 2.在blocks对象数组中新增一个{data: realDate}对象
            //3.在blocks对象数组查找到date为当前日期的对象，并根据timeID找到该对象中的时间槽数组`block${timeID}`，
            //4.将新的时间块数据push入blocks.$.block${timeID}中

            // console.log('1完成');
            // 为避免写重复操作代码冗长，这里采用另一种方法>>>> 引导用户在前端重新点击CUTIT按钮，重新定义并设置时间块上传
            // res.send("新的一天又开始了，请重新定义并设置时间块上传")

            /*   userdata.update({ //3.在blocks对象数组查找到date为当前日期的对象
                          "account": userName,
                          "blocks": {
                            "$elemMatch": {
                              "date": realDate
                            }
                          }
                        }, {
                          "$push": { //4.将新的时间块数据push入当前日期的对象中
                            "blocks.$.block1": newBlock
                          }
                        }, {
                          "multi": true
                        }, (err, doc) => { // 当所有操作完成后
                          if (err) {
                            res.send("新增失败")
                          } else {
                            res.send("新增blocks成功")
                          }

                        }) */


            if (TimeId == "1") {
              blocksModel.addBlocksTime1(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "2") {
              blocksModel.addBlocksTime2(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "3") {
              blocksModel.addBlocksTime3(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "4") {
              blocksModel.addBlocksTime4(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "5") {
              blocksModel.addBlocksTime5(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "6") {
              blocksModel.addBlocksTime6(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "7") {
              blocksModel.addBlocksTime7(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "8") {
              blocksModel.addBlocksTime8(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "9") {
              blocksModel.addBlocksTime9(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "10") {
              blocksModel.addBlocksTime10(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "11") {
              blocksModel.addBlocksTime11(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            } else if (TimeId == "12") {
              blocksModel.addBlocksTime12(userName, realDate, newBlock).exec(
                function (err, raw) {
                  if (err) {
                    res.send("新增失败,未知错误")
                  } else {
                    res.send("新增blocks成功")
                  }
                }
              )
            }

          }
        })

      }
    }
  })

})

module.exports = router;