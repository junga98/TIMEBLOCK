var express = require('express');
var router = express.Router();

var blocksModel = require('./../model/blocks');

router.get('/', (req, res) => {
  let date = new Date()
  let nowDay = date.getUTCDay()

  let realDate = `${date.getUTCFullYear()}${date.getUTCMonth()+1}${date.getUTCDate()}`

  // 默认本周为 周一到周日
  // 只做本月的统计 自然周跨月不计 只计当月（暂）
  let weekDate = [] // 存下当周的日期范围的数组
  weekDate[0] = parseInt(realDate) // 当前日期为数组第一项

  /* else if (nowDay == "1") { // 周一只需获取当天的数据,在上一步已完成
  }  */

  if (nowDay == "2") { // 获取周一周二的数据
    weekDate.push(parseInt(realDate) - 1)
  } else if (nowDay == "3") { // 获取三天内的数据
    weekDate.push(parseInt(realDate) - 1)
    weekDate.push(parseInt(realDate) - 2)
  } else if (nowDay == "4") { // 获取四天内的数据
    for (let i = 1; i <= 3; i++) {
      weekDate.push(parseInt(realDate) - i)
    }
  } else if (nowDay == "5") { // 获取五天内的数据
    for (let i = 1; i <= 4; i++) {
      weekDate.push(parseInt(realDate) - i)
    }
  } else if (nowDay == "6") { // 获取六天内的数据
    for (let i = 1; i <= 5; i++) {
      weekDate.push(parseInt(realDate) - i)
    }
  } else if (nowDay == "0") { // 获取本周七天所有数据
    for (let i = 1; i <= 6; i++) {
      weekDate.push(parseInt(realDate) - i)
    }
  }
  // console.log(weekDate);

  let resData = [] // 存储本周时间块数据

  for (let i = 0; i < weekDate.length; i++) {
    blocksModel.getWeekBlocks(req.query, weekDate[i]).exec(
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          // console.log(doc);
          resData.push(doc) // 将找出的记录存入resData中

          if (i == weekDate.length - 1) { // 最后一次时发送收集到的本周数据
            res.send(resData)
          }
        }
      }
    )
  }




})

module.exports = router;