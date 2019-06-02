const userdata = require('./../config/db.js').userdataModel

module.exports = {
    // 新增一个预设
    addPreset: function addPreset(params) {
        let addpreset = {
            name: params.newName,
            color: params.newColor
        }

        return userdata.update({
            "account": params.userName
        }, {
            "$push": {
                "presets": addpreset
            }
        })
    },
    getPreset: function getPreset(params) {
        return userdata.find({
            "account": params.userName
        }, {
            "presets": 1,
            "_id": 0
        }).exec()
    },

    delPreset: function delPreset(params) {
        return userdata.update({
                "account": params.userName
            }, {
                "$pull": {
                    "presets": {
                        "name": params.presetName
                    }
                }
            })
    }

};