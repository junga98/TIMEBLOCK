const userdata = require('./../config/db.js').userdataModel

module.exports = {
  // 新增一个预设
  addProgress: function addPreset(params) {

    let addprogress = {
      name: params.progressName,
      type: params.progressType,
      goal: params.progressTime
    }

    return userdata.update({
      "account": params.userName
    }, {
      "$push": {
        "progresses": addprogress
      }
    })
  },
  getProgress: function getPreset(params) {
    return userdata.find({
      "account": params.userName
    }, {
      "progresses": 1,
      "_id": 0
    }).exec()
  },

  delProgress: function delPreset(params) {
    return userdata.update({
      "account": params.userName
    }, {
      "$pull": {
        "progresses": {
          "name": params.progressName
        }
      }
    })
  }

};