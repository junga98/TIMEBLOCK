const userdata = require('./../config/db.js').userdataModel


/* 数据模型
let as = {
    acountName: "JUNGA",
    password: "12345678",
    blocks: [
        {
            date: "20181220",
            block1: [{}, {}, {}],
            "block2": [],
            "block3": [],
            "block4": [],
            "block5": []
        },
        {
            date: "20181221",
            "block1": [],
            "block2": [],
            "block3": [],
            "block4": [],
            "block5": []
        }
    ]
}*/



module.exports = {
    getWeekBlocks: function getWeekBlocks(params, weekDate) { // 获取当前周的时间块
        let userName = params.userName

        let date = String(weekDate)
        return userdata.findOne({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": date
                }
            }
        }, {
            "blocks.$": 1
        })


    },
    getMonthBlocks: function getMonthBlocks(params) { // 获取当月的时间块

    },
    addBlocksTime1: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block1": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime2: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block2": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime3: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block3": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime4: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block4": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime5: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block5": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime6: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block6": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime7: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block7": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime8: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block8": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime9: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block9": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime10: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block10": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime11: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block11": newBlock
            }
        }, {
            "multi": true
        })
    },
    addBlocksTime12: function addBlocksTime1(userName, realDate, newBlock) {
        return userdata.update({
            "account": userName,
            "blocks": {
                "$elemMatch": {
                    "date": realDate
                }
            }
        }, {
            "$push": {
                "blocks.$.block12": newBlock
            }
        }, {
            "multi": true
        })
    }
}