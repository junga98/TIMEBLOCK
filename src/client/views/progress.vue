<template>
    <div id="page_progress">
        <div id="contentScroll">
            <progress-block v-for="(progress,index) in progresses" :progress="progress" :key="index" :data-progressName="progress.name"
                @reGET="reGET"></progress-block>
        </div>

        <button id="addProgress" type="button" @click="addNewProgress">+</button>

        <!-- 目标组件 -->
        <div id="setNewProgress" v-show="setNewProgress">
            <select id="select" v-model="progressName">
                <option v-for="(preset, index) in presets" :key="index" :value="preset.name">{{preset.name}}</option>
            </select>
            <select v-model="progressType" @change="selectTip">
                <option value="日">日</option>
                <option value="周">周</option>
                <option value="月">月</option>
            </select>
            <input id="INPUTtime" type="text" placeholder="时限设定/分钟" v-model="progressTime" required>
            <div>
                <button class="plus" @click="plus5">+5</button>
                <button class="plus" @click="plus10">+10</button>
                <button class="plus" @click="plus30">+30</button>
                <button class="plus" @click="plus60">+60</button>
                <button class="reduce" @click="reduce5">-5</button>
                <button class="reduce" @click="reduce10">-10</button>
                <button class="reduce" @click="reduce20">-20</button>
            </div>
            <div class="button">
                <button @click="SetProgress">确定</button>
                <button @click="close">取消</button>
            </div>
        </div>

        <alert-tip v-show="tipShow">
            <template slot="tip">
                {{tip}}
            </template>
        </alert-tip>
    </div>
</template>
<script>
    import store from "./../store/store.js";
    import progressBlock from "./../components/progressBlock.vue";
    import api from './../store/api.js';
    import alertTip from './../components/alertTip.vue'

    export default {
        components: {
            progressBlock,
            alertTip
        },
        data() {
            return {
                progresses: [],
                setNewProgress: false,
                progressType: "日",
                progressName: "",
                progressTime: 0,
                finishTime: []
            };
        },
        computed: {
            presets() {
                return this.$store.state.presets;
            },
            tip() {
                return this.$store.state.tip;
            },
            tipShow() {
                return this.$store.state.tipShow;
            },
        },
        methods: {
            addNewProgress: function () {
                var _this = this;
                if (this.$data.setNewProgress == false) {
                    _this.$data.setNewProgress = true;
                } else {
                    _this.$data.setNewProgress = false;
                }
            },
            SetProgress: function () {
                let progressName = this.$data.progressName
                let progressTime = this.$data.progressTime
                let progressType = this.$data.progressType

                if (progressName != "" && progressTime != 0) {
                    let userName = localStorage.getItem("userName");
                    let newProgress = {
                        userName: userName,
                        progressName: progressName,
                        progressTime: progressTime,
                        progressType: progressType
                    }

                    this.$data.setNewProgress = false;
                    this.$data.progressType = "日"
                    this.$data.progressName = ""
                    this.$data.progressTime = 0

                    store.commit("ShowLoading", {
                        show: true,
                        tip: '上传中'
                    })

                    api.addProgress(newProgress)
                        .then(res => {
                            this.getProgress()
                            store.commit("ShowLoading", {
                                show: false,
                                tip: ''
                            })
                        }).catch(error => {
                            reject(error)
                        })

                } else {
                    store.commit("AlertShow", true);
                    store.commit("AlertTip", "请补全信息");
                    return false;
                }
            },
            getProgress: function () {
                let userName = localStorage.getItem("userName");

                api.getProgress({
                    userName: userName
                }).then(res => {
                    // this.$data.progresses = res.data
                    var resProgress = res.data

                    let userName = localStorage.getItem("userName");
                    let params = {
                        userName: userName,
                        type: "today"
                    };
                    api.getDayBlocks(params).then(res => {
                        let allData = [];

                        // 将所有返回的数据合并存入allData中，只保留name和time字段
                        let blocks = res.blocks[0];
                        // console.log(blocks);

                        if (blocks.block1) {
                            let resBlock1 = blocks.block1.map(function (item) {
                                let blockData1 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData1);
                            });
                        }

                        if (blocks.block2) {
                            let resBlock2 = blocks.block2.map(function (item) {
                                let blockData2 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData2);
                            });
                        }
                        if (blocks.block3) {
                            let resBlock3 = blocks.block3.map(function (item) {
                                let blockData3 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData3);
                            });
                        }
                        if (blocks.block4) {
                            let resBlock4 = blocks.block4.map(function (item) {
                                let blockData4 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData4);
                            });
                        }
                        if (blocks.block5) {
                            let resBlock5 = blocks.block5.map(function (item) {
                                let blockData5 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData5);
                            });
                        }
                        if (blocks.block6) {
                            let resBlock6 = blocks.block6.map(function (item) {
                                let blockData6 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData6);
                            });
                        }
                        if (blocks.block7) {
                            let resBlock7 = blocks.block7.map(function (item) {
                                let blockData7 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData7);
                            });
                        }
                        if (blocks.block8) {
                            let resBlock8 = blocks.block8.map(function (item) {
                                let blockData8 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData8);
                            });
                        }
                        if (blocks.block9) {
                            let resBlock9 = blocks.block9.map(function (item) {
                                let blockData9 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData9);
                            });
                        }
                        if (blocks.block10) {
                            let resBlock10 = blocks.block10.map(function (item) {
                                let blockData10 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData10);
                            });
                        }
                        if (blocks.block11) {
                            let resBlock11 = blocks.block11.map(function (item) {
                                let blockData11 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData11);
                            });
                        }
                        if (blocks.block12) {
                            let resBlock12 = blocks.block12.map(function (item) {
                                let blockData12 = {
                                    name: item.name,
                                    time: item.time
                                };
                                allData.push(blockData12);
                            });
                        }

                        /* 合并算法
                        将allData的数据进行同名合并，时长相加
                         */
                        var map = {}, // 外部对象，用来标记在finishTime中是否已经存入同名的项
                            finishTime = []; // 存储合并同类项后的数据

                        for (var i = 0; i < allData.length; i++) {
                            // 遍历allData
                            var ai = allData[i];
                            if (!map[ai.name]) {
                                // 查看map中是否存在该键名
                                finishTime.push({
                                    // 如果为否的话 将{名字,时长}存入finishTime中
                                    name: ai.name,
                                    value: ai.time
                                });
                                map[ai.name] = ai;
                            } else {
                                // 存在该键名的话
                                for (var j = 0; j < finishTime.length; j++) {
                                    var dj = finishTime[j];
                                    if (dj.name == ai.name) {
                                        // 在finishTime[]中找到与allData[i]同名的对象
                                        dj.value += ai.time; // 更新行为时长
                                        break;
                                    }
                                }
                            }
                        }
                        // 将整合后的数据存入finishTime中，以供目标去审阅是否有匹配字段，有则算出目标完成进度
                        this.$data.finishTime = finishTime;

                        var _this = this
                        let progresses = resProgress

                        finishTime.map(function (finish) {
                            progresses.map(function (progress) {
                                if (progress.name == finish.name) { // 遍历两个数组，匹配相同名字的字段
                                    // console.log('有相同名字');
                                    let finishTime = (finish.value / progress.goal) // 完成度=已完成时间/目标时间

                                    for (let pro in progresses) { // 查找匹配名字对应的项
                                        if (progresses[pro].name == finish.name) {
                                            // console.log('有相同');
                                            // 为匹配到的目标对象添加进度值
                                            let finishPercent = finishTime * 100 // 这里在前端需要转换成百分比数 所以*100
                                            if (finishPercent <= 100) {
                                                resProgress[pro].time =
                                                    finishPercent
                                            } else { // 超出百分比100的设置上限为100
                                                finishPercent = 100
                                                resProgress[pro].time =
                                                    finishPercent
                                            }

                                            // 目标进度条的颜色
                                            if (0 < finishPercent && finishPercent <=
                                                30) {
                                                resProgress[pro].color =
                                                    "rgb(201, 48, 44)" // 红色
                                            } else if (30 < finishPercent &&
                                                finishPercent < 90) {
                                                resProgress[pro].color =
                                                    "rgb(240, 173, 78)" // 黄色
                                            } else if (90 <= finishPercent &&
                                                finishPercent <= 100) {
                                                resProgress[pro].color =
                                                    "rgb(92, 184, 92)" // 绿色
                                            }
                                        }

                                    }
                                    // 将数据库返回的数据进行再次封装，根据已完成的时长添加键[time]和对应进度t条的颜色[color]，并记录完成度，处理后反馈给前端
                                    _this.$data.progresses = resProgress
                                }
                            })
                        })

                        store.commit("ShowLoading", {
                            show: false,
                            tip: ''
                        })

                    })


                }).catch(error => {
                    reject(error)
                })
            },
            reGET: function (state) { // 点击删除时 父组件重新获取数据     
                this.getProgress()
            },
            close: function () {
                this.$data.setNewProgress = false;
            },
            selectTip: function () {
                if (this.$data.progressType == "周" || this.$data.progressType == "月") {
                    store.commit("AlertShow", true);
                    store.commit("AlertTip", "功能正在开发中...请关注后续版本");
                }
            },
            plus5: function () {
                this.$data.progressTime += 5;
            },
            plus10: function () {
                this.$data.progressTime += 10;
            },
            plus30: function () {
                this.$data.progressTime += 30;
            },
            plus60: function () {
                this.$data.progressTime += 60;
            },
            reduce5: function () {
                if (this.$data.progressTime > 0) {
                    this.$data.progressTime -= 5;
                }
            },
            reduce10: function () {
                if (this.$data.progressTime >= 10) {
                    this.$data.progressTime -= 10;
                }
            },
            reduce20: function () {
                if (this.$data.progressTime >= 20) {
                    this.$data.progressTime -= 20;
                }
            }
        },
        mounted() {
            store.commit("ShowList", false);
            this.getProgress()

            this.$store.commit("headerShow", true)
            this.$store.commit("AlertTip", "周、月目标功能正在开发中...");
            this.$store.commit("AlertShow", true);
        }
    };
</script>
<style scoped>
    #page_progress {
        display: flex;
        width: 100%;
        height: 90vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #contentScroll {
        width: 100%;
        height: 90vh;
        overflow: auto;
        /* overflow-y: hidden */
    }

    #addProgress {
        position: absolute;
        right: 20px;
        bottom: 0px;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        right: 4%;
        top: 14px;
        margin-left: -38px;
        background-color: rgba(204, 215, 247, 0.479);
        font-size: 36px;
        color: #fff;
        border: 0;
        box-shadow: 1px 1px 5px #444;
    }

    #setNewProgress {
        width: 100%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: rgba(85, 85, 85, 0.7);
        position: absolute;
        z-index: 10;
    }

    #setNewProgress input {
        width: 70%;
        height: 24px;
        margin-top: 20px;
        text-align: center;
        border-radius: 10px;
    }

    #setNewProgress label {
        width: 20%;
    }

    #setNewProgress select {
        width: 80%;
        height: 24px;
        margin-top: 8px;
        text-align: center;
        text-align-last: center;
        border-radius: 10px;
    }

    #setNewProgress option {
        text-align: center;
        text-align-last: center;
    }

    .button button {
        width: 90px;
        border: 0;
        border-radius: 8px;
        color: #fff;
        margin-top: 20px;
        padding: 10px;
        background-color: rgb(86, 145, 255);
    }

    .plus {
        background-color: rgb(255, 114, 114);
        color: #FFF;
        margin-top: 8px;
        padding: 8px;
        border: 0;
        border-radius: 8px;
        outline: none;
    }

    .reduce {
        padding: 8px;
        margin-top: 8px;
        color: #FFF;
        background-color: rgb(255, 163, 110);
        border: 0;
        border-radius: 8px;
        outline: none;
    }
</style>