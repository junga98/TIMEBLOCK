<template>
  <div id="visualData">
    <div id="getData">
      <select id="dataType" v-model="chartDataType" @change="typeChange">
        <option value="查看当天" selected>查看当天</option>
        <option value="查看指定日期">查看指定日期</option>
        <option value="查看本周">查看本周</option>
        <option value="查看本月">查看本月</option>
      </select>
      <button @click="getData">获取</button>
    </div>

    <!-- 选择某天组件 -->
    <div id="selectOneDay2" v-show="selectOneDay">
      <input type="text" v-model="oneDay" placeholder="获取某一天: 20181211">
    </div>

    <!-- 图表类型选择组件 -->
    <div id="chartType">
      <div class="chartTypeBlock" v-for="(chartType,index) in chartTypes" :key="index" :class="{active: chartType.active}"
        @click="changeType(chartType.type,index)">{{chartType.name}}</div>
    </div>

    <div class="chart" id="myChart" :style="{width: '100%', height: '400px'}"></div>

    <alert-tip v-show="tipShow">
      <template slot="tip">{{tip}}</template>
    </alert-tip>

  </div>
</template>


<script>
  import store from "./../store/store.js";
  import api from "./../store/api.js";
  import alertTip from "./../components/alertTip.vue";

  // 引入基本模板
  let echarts = require("echarts/lib/echarts");

  require("echarts/lib/chart/bar"); // 引入柱状图组件
  require("echarts/lib/chart/pie"); // 引入饼状图
  require("echarts/lib/chart/treemap"); // 堆叠区域图
  require("echarts/lib/chart/line"); //折线图
  require("echarts/lib/chart/funnel"); // 漏斗

  // 引入提示框和title组件
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/title");
  export default {
    name: "visualData",
    components: {
      alertTip
    },
    data() {
      return {
        myChart: {},
        chartTypes: [{
            name: "柱状图",
            type: "bar",
            active: true
          },
          {
            name: "折线图",
            type: "line",
            active: false
          },
          {
            name: "饼图",
            type: "pie",
            active: false
          },
          {
            name: "饼图2",
            type: "pie2",
            active: false
          },
          {
            name: "金字塔图",
            type: "funnel",
            active: false
          },
          {
            name: "面积图",
            type: "treemap",
            active: false
          }
        ],
        type: "bar",
        chartDataType: "查看当天",
        chartData: [],
        chartName: [],
        chartValue: [],
        selectOneDay: false,
        oneDay: ""
      };
    },
    computed: {
      title() {
        return this.$store.state.title;
      },
      tipShow() {
        return this.$store.state.tipShow;
      },
      tip() {
        return this.$store.state.tip;
      }
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("myChart"), "dark", {
          renderer: "svg"
        });

        // 绘制图表
        let clickType = this.$data.type; // 点击的图标类型
        let chartData = this.$data.chartData; // 完整合并数据
        let chartName = this.$data.chartName; // 只有名字的合并数据
        let chartValue = this.$data.chartValue; // 只有值的合并数据

        // console.log(clickType);

        if (
          clickType == "pie" ||
          clickType == "treemap" ||
          clickType == "funnel"
        ) {
          myChart.clear(); // 清除画布
          myChart.setOption({
            title: {},
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {},
            series: [{
              type: clickType,
              xAxis: {},
              yAxis: {},
              radius: "55%",
              center: ["50%", "50%"],
              data: chartData.sort(function (a, b) {
                return a.value - b.value;
              }),

              label: {
                normal: {}
              },
              labelLine: {
                normal: {}
              },
              itemStyle: {
                normal: {}
              },

              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }]
          });
        } else if (clickType == "line") {
          myChart.clear();
          myChart.setOption({
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985"
                }
              }
            },
            legend: {
              data: chartName
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [{
              type: "category",
              boundaryGap: false,
              data: chartName
            }],
            yAxis: [{
              type: "value"
            }],
            series: [{
              type: "line",
              data: chartValue
            }]
          });
        } else if (clickType == "bar") {
          myChart.clear();
          myChart.setOption({
            xAxis: {
              type: "category",
              data: chartName
            },
            yAxis: {
              type: "value"
            },
            series: [{
              data: chartValue,
              type: "bar"
            }]
          });
        } else if (clickType == "pie2") {
          myChart.clear();
          myChart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              x: "left",
              data: chartName
            },
            series: [{
              name: "组成",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: chartData
            }]
          });
        }
        return {
          myChart: myChart
        };
      },
      getToday: function () {

        const _this = this
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
          // console.log(allData);

          /* 合并算法
          将allData的数据进行同名合并，时长相加
           */
          var map = {}, // 外部对象，用来标记在chartData中是否已经存入同名的项
            chartData = []; // 存储合并同类项后的数据

          for (var i = 0; i < allData.length; i++) {
            // 遍历allData
            var ai = allData[i];
            if (!map[ai.name]) {
              // 查看map中是否存在该键名
              chartData.push({
                // 如果为否的话 将{名字,时长}存入chartData中
                name: ai.name,
                value: ai.time
              });
              map[ai.name] = ai;
            } else {
              // 存在该键名的话
              for (var j = 0; j < chartData.length; j++) {
                var dj = chartData[j];
                if (dj.name == ai.name) {
                  // 在chartData[]中找到与allData[i]同名的对象
                  dj.value += ai.time; // 更新行为时长
                  break;
                }
              }
            }
          }

          // console.log(chartData);
          // 封装数据格式
          let chartName = chartData.map(function (item) {
            // 只保存名字
            return item.name;
          });
          let chartValue = chartData.map(function (item) {
            // 只保存值
            return item.value;
          });

          _this.$data.chartData = chartData;
          _this.$data.chartName = chartName;
          _this.$data.chartValue = chartValue;

          let echarts = _this.drawLine();
          _this.$data.myChart = echarts.myChart;
        });
      },
      getWeek: function () {
        let userName = localStorage.getItem("userName");
        let _this = this

        api.getWeekBlocks({
          userName: userName
        }).then(res => {
          // console.log(res);

          let allData = [] // 整合一周的数据存入
          res.map(function (item) { // 取出每天的数据
            if (item != null) {
              if (item.blocks[0].block1) {
                item.blocks[0].block1.map(function (block) { // 对每日数据进行处理
                  allData.push(block) // 取出子项存入总数组
                })
              }

              if (item.blocks[0].block2) {
                item.blocks[0].block2.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block3) {
                item.blocks[0].block3.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block4) {
                item.blocks[0].block4.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block5) {
                item.blocks[0].block5.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block6) {
                item.blocks[0].block6.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block7) {
                item.blocks[0].block7.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block8) {
                item.blocks[0].block8.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block9) {
                item.blocks[0].block9.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block10) {
                item.blocks[0].block10.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block11) {
                item.blocks[0].block11.map(function (block) {
                  allData.push(block)
                })
              }
              if (item.blocks[0].block12) {
                item.blocks[0].block12.map(function (block) {
                  allData.push(block)
                })
              }
            }
          })

          /* 合并算法
          将allData的数据进行同名合并，时长相加
           */
          var map = {}, // 外部对象，用来标记在chartData中是否已经存入同名的项
            chartData = []; // 存储合并同类项后的数据

          for (var i = 0; i < allData.length; i++) {
            // 遍历allData
            var ai = allData[i];
            if (!map[ai.name]) {
              // 查看map中是否存在该键名
              chartData.push({
                // 如果为否的话 将{名字,时长}存入chartData中
                name: ai.name,
                value: ai.time
              });
              map[ai.name] = ai;
            } else {
              // 存在该键名的话
              for (var j = 0; j < chartData.length; j++) {
                var dj = chartData[j];
                if (dj.name == ai.name) {
                  // 在chartData[]中找到与allData[i]同名的对象
                  dj.value += ai.time; // 更新行为时长
                  break;
                }
              }
            }
          }
          // 封装数据格式
          let chartName = chartData.map(function (item) {
            // 只保存名字
            return item.name;
          });
          let chartValue = chartData.map(function (item) {
            // 只保存值
            return item.value;
          });

          _this.$data.chartData = chartData;
          _this.$data.chartName = chartName;
          _this.$data.chartValue = chartValue;

          let echarts = _this.drawLine();
          _this.$data.myChart = echarts.myChart;
        })

      },
      getOneDay: function () {
        const _this = this
        let userName = localStorage.getItem("userName");
        let oneDay = this.$data.oneDay;
        let params = {
          userName: userName,
          type: oneDay
        }

        api.getDayBlocks(params).then(res => {
          // 将所有返回的数据合并存入allData中，只保留name和time字段
          let allData = [];

          if (res == null || res == undefined || res == "") { // 如果当天不存在数据
            _this.$store.commit("AlertTip", "当日不存在数据");
            _this.$store.commit("AlertShow", true);
            return false
          }

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
          // console.log(allData);

          /* 合并算法
          将allData的数据进行同名合并，时长相加
           */
          var map = {}, // 外部对象，用来标记在chartData中是否已经存入同名的项
            chartData = []; // 存储合并同类项后的数据

          for (var i = 0; i < allData.length; i++) {
            // 遍历allData
            var ai = allData[i];
            if (!map[ai.name]) {
              // 查看map中是否存在该键名
              chartData.push({
                // 如果为否的话 将{名字,时长}存入chartData中
                name: ai.name,
                value: ai.time
              });
              map[ai.name] = ai;
            } else {
              // 存在该键名的话
              for (var j = 0; j < chartData.length; j++) {
                var dj = chartData[j];
                if (dj.name == ai.name) {
                  // 在chartData[]中找到与allData[i]同名的对象
                  dj.value += ai.time; // 更新行为时长
                  break;
                }
              }
            }
          }

          // console.log(chartData);
          // 封装数据格式
          let chartName = chartData.map(function (item) {
            // 只保存名字
            return item.name;
          });
          let chartValue = chartData.map(function (item) {
            // 只保存值
            return item.value;
          });

          _this.$data.chartData = chartData;
          _this.$data.chartName = chartName;
          _this.$data.chartValue = chartValue;

          let echarts = _this.drawLine();
          _this.$data.myChart = echarts.myChart;
        });
      },
      changeType: function (type, index) {
        // 高亮显示当前选项
        let length = this.$data.chartTypes.length;
        for (let i = 0; i < length; i++) {
          this.$data.chartTypes[i].active = false;
        }
        this.$data.chartTypes[index].active = true;
        // ------------------------- 对应的图标类型切换
        this.$data.type = type;
        this.drawLine();
      },
      getData: function () {
        let dataType = this.$data.chartDataType
        const _this = this

        if (dataType == "查看当天") {
          this.getToday()
        } else if (dataType == "查看指定日期") {
          this.getOneDay()
        } else if (dataType == "查看本周") {
          this.getWeek()
        } else if (dataType == "查看本月") {
          _this.$store.commit("AlertTip", "功能正在开发中...");
          _this.$store.commit("AlertShow", true);
        }

      },
      typeChange: function () {
        if (this.$data.chartDataType == "查看指定日期") {
          this.$data.selectOneDay = true
        } else {
          this.$data.selectOneDay = false
        }
      }
    },
    mounted() {
      store.commit("ShowList", false);
      store.commit("SETheaderBgColor", "rgb(51, 51, 51)");
      store.commit("headerShow", true)
      var _this = this;

      this.getToday()

      window.onresize = () => {
        // 这里使用箭头函数，避免this指向问题
        this.$data.myChart.resize();
      };
    },
    beforeDestroy() {
      store.commit("SETheaderBgColor", "");
    }
  };
</script>
<style scoped>
  #visualData {
    width: 100%;
    height: 90vh;
    background-color: rgb(51, 51, 51);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chart {
    flex: 1;
  }

  #getData {
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5em;
  }

  #dataType {
    padding: 5px;
    width: 78%;
    background-color: rgba(192, 192, 192, 0.589);
    color: #232323;
  }

  #getData button {
    width: 18%;
    border: 0;
    padding: 0px 2px 0px 2px;
    border-radius: 4px;
    background-color: rgb(223, 223, 223);
  }

  #chartType {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94%;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .chartTypeBlock {
    width: 70px;
    text-align: center;
    padding: 5px;
    font-size: 15px;
    margin-left: 6px;
    margin-top: 6px;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: rgb(83, 83, 83);
  }

  .active {
    background-color: #fff;
    color: #2c2c2c;
    box-shadow: 0px 0px 4px rgb(250, 250, 250);
  }

  #selectOneDay2 {
    position: absolute;
    top: 10vh;
    width: 60%;
    left: 5%;
  }

  #selectOneDay2 input {
    width: 100%;
    height: 20px;
    font-size: 15px;
    padding: 3px;
    text-align: center;
  }
</style>