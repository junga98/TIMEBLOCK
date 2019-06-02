<template>
  <div id="home">
    <div id="contentScroll">
      <div id="blocks">
        <time-container v-for="(blocka,index) in blocks" :childblock="blocka" :key="blocka.index" :data-id-time="index"></time-container>
      </div>
    </div>

    <button id="main" @click="cutit2">CUTIT</button>

    <!-- 选择某天组件 -->
    <div id="selectOneDay" v-show="selectOneDay">
      <input type="text" v-model="oneDay" placeholder="获取某一天: 20181211">
      <button @click="getOneDay">获取</button>
    </div>

    <button id="today" class="getDay" @click="getToday">
      <svg class="homeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z"></path>
      </svg>
    </button>

    <button id="date" class="getDay" @click="selectDay">
      <svg class="homeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm116 204c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm128 128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40zm0-128c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-40z"></path>
      </svg>
    </button>

    <alert-tip v-show="tipShow">
      <template slot="tip">{{tip}}</template>
    </alert-tip>

    <set-new-block v-show="setNewBlock"></set-new-block>
  </div>
</template>

<script>
  import timeContainer from "./../components/timeContainer.vue";
  import setNewBlock from "./../components/setNewBlock.vue";
  import alertTip from "./../components/alertTip.vue";

  export default {
    name: "home",
    components: {
      alertTip,
      timeContainer,
      setNewBlock
    },
    data() {
      return {
        now: "",
        nowHour: 0,
        oneDay: "",
        selectOneDay: false
      };
    },
    computed: {
      blocks() {
        return this.$store.state.blocks;
      },
      setNewBlock() {
        return this.$store.state.setNewBlock;
      },
      clickBlockTimeId() {
        return this.$store.state.clickBlockTimeId;
      },
      clickBlockId() {
        return this.$store.state.clickBlockId;
      },
      tipShow() {
        return this.$store.state.tipShow;
      },
      tip() {
        return this.$store.state.tip;
      }
    },
    methods: {
      cutit2: function () {
        var _this = this;

        var date = new Date(); // 获取当前时间
        var hour = date.getHours(); //获取当前小时数(0-23)
        var min = date.getMinutes(); //获取当前分钟数(0-59)
        var now = hour + ":" + min; //转成 xx:xx 形式存储

        var oldTime = localStorage.getItem("now");
        if (oldTime == null) {
          localStorage.setItem("now", "");
        }
        var oldDate = localStorage.getItem("now");

        var oldHour = oldDate.slice(0, 2);
        var oldMin = oldDate.slice(3, 5);

        // console.log("旧的时间是" + oldHour + ":" + oldMin)
        // console.log("新的时间是" + hour + ":" + min)

        localStorage.setItem("now", now);

        let pastMin = min - oldMin;
        let pastHour = hour - oldHour;
        if (pastHour >= 1) {
          pastMin += 60 * pastHour;
        }
        console.log("距离上一次过了" + pastMin + "分钟");
        // 10:58  11:00
        /* 
              11 -10 =1
              00-58 = -58
              true>>> -58+60 = 2
              */
        if (pastMin == 0) {
          // 小于1分钟的事件不记录
          _this.$store.commit("AlertTip", "事件的时长需要大于一分钟");
          _this.alertTip();
          return false;
        }

        if (hour % 2 == 0) {
          // 当时间是双数时，占当前时间槽，从下一时间槽开始
          this.$data.nowHour = hour / 2 + 1;
        } else if (hour % 2 == 1) {
          // 当时间是单数时，不占当前时间槽
          this.$data.nowHour = (hour - 1) / 2 + 1;
        }

        let nowHour = this.$data.nowHour;
        // 将时间转换成块长度  5/6
        let NumBlockLength = pastMin * 3;
        let StrBlockLength = NumBlockLength + "%";
        // console.log(nowHour)

        /* let arr = "this.$data.blocks.block" + i + ".push(paddingBlock)"
                eval(arr) // eval()执行字符串 */
        let newBlockID = eval(
          "this.$store.state.blocks.block" + nowHour + ".length"
        );
        // console.log(newBlockID);

        let newBlock = {
          id: newBlockID,
          name: "",
          time: pastMin,
          blockWidth: StrBlockLength,
          color: "#FFFFFF"
        };
        // console.log(nowHour)
        // let pushNew = "this.$data.blocks.block" + nowHour + ".push(newBlock)";
        // eval(pushNew);

        // 将新的时间块加入 到store.blocks.block?中
        switch (nowHour) {
          case 1:
            _this.$store.commit({
              type: "pushBlock1",
              pushData: newBlock
            });
            break;
          case 2:
            _this.$store.commit({
              type: "pushBlock2",
              pushData: newBlock
            });
            break;
          case 3:
            _this.$store.commit({
              type: "pushBlock3",
              pushData: newBlock
            });
            break;
          case 4:
            _this.$store.commit({
              type: "pushBlock4",
              pushData: newBlock
            });
            break;
          case 5:
            _this.$store.commit({
              type: "pushBlock5",
              pushData: newBlock
            });
            break;
          case 6:
           _this.$store.commit({
              type: "pushBlock6",
              pushData: newBlock
            });
            break;
          case 7:
           _this.$store.commit({
              type: "pushBlock7",
              pushData: newBlock
            });
            break;
          case 8:
            _this.$store.commit({
              type: "pushBlock8",
              pushData: newBlock
            });
            break;
          case 9:
            _this.$store.commit({
              type: "pushBlock9",
              pushData: newBlock
            });
            break;
          case 10:
           _this.$store.commit({
              type: "pushBlock10",
              pushData: newBlock
            });
            break;
          case 11:
            _this.$store.commit({
              type: "pushBlock11",
              pushData: newBlock
            });
            break;
          case 12:
            _this.$store.commit({
              type: "pushBlock12",
              pushData: newBlock
            });
            break;
        }
      },
      getOneDay: function () {
        let userName = localStorage.getItem("userName");
        let oneDay = this.$data.oneDay;

        this.$store.dispatch("getDayBlocks", {
          userName: userName,
          type: oneDay
        });

        this.$data.selectOneDay = false;
        this.$data.oneDay = "";
      },
      getToday: function () {
        let userName = localStorage.getItem("userName");
        this.$store.dispatch("getDayBlocks", {
          userName: userName,
          type: "today"
        });
      },
      selectDay() {
        if (this.$data.selectOneDay == false) {
          this.$data.selectOneDay = true;
        } else {
          this.$data.selectOneDay = false;
        }
      },
      alertTip() {
        this.$store.commit("AlertShow", true);
      }
    },
    created() {
      let userName = localStorage.getItem('userName')
      this.$store.dispatch('getPresets', {
        userName: userName
      });
    },
    mounted() {
      this.$store.commit("headerShow", true)
      this.$store.commit("Showpreset", true); // 设置面板组件有预设选择项
      this.$store.commit("ShowList", false);

      this.getToday();
    }
  };
</script>

<style>
  #home {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #main {
    width: 36%;
    height: 8%;
    margin-top: 20px;
    border-radius: 22px;
    font-size: 18px;
    color: #fff;
    border: 0;
    box-shadow: 0px 0px 15px #48c6ef;
    background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    outline: none;
  }

  #contentScroll {
    width: 100%;
    height: 76vh;
    top: 8vh;
    overflow: auto;
    /* overflow-y: hidden */
  }

  #blocks {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #selectOneDay {
    position: absolute;
    bottom: 13%;
  }

  #selectOneDay input {
    height: 22px;
    text-align: center;
  }

  #selectOneDay button {
    border: 0;
    padding: 6px;
    border-radius: 4px;
    background-color: rgb(223, 223, 223);
  }

  .getDay {
    border: 0;
    outline: none;
    border-radius: 8px;
    background-color: rgba(62, 139, 255, 0.295);
  }

  #today {
    position: absolute;
    padding: 8px;
    left: 6%;
    bottom: 4.5%;
  }

  #date {
    position: absolute;
    padding: 8px;
    right: 6%;
    bottom: 4.5%;
  }

  .homeIcon {
    width: 24px;
    height: 24px;

    fill: #fff;
  }

  @keyframes listMove {
    0% {
      transform: scale(0);
    }

    25% {
      transform: scale(0.5);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes blockShow {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>