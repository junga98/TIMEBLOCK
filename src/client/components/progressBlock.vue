<template>
  <div class="progress">
    <div class="progressText">
      <div class="progressName">目标名称: {{progress.name}}</div>
      <div class="progressType">类型: {{progress.type}}</div>
      <div class="progressTime">时限: {{progress.goal}}分钟</div>
      <div class="del2">
        <button type="button" @click="delProgress">✘</button>
      </div>
    </div>
    <div class="progressLoading">
      <div class="load" :style="{width: progress.time+'%',backgroundColor: progress.color}"></div>
    </div>
  </div>
</template>
<script>
  import api from './../store/api.js';

  export default {
    props: ["progress"],
    methods: {
      delProgress: function (e) {
        let progressName = e.path[3].dataset.progressname
        let userName = localStorage.getItem('userName')

        api.delProgress({
          userName: userName,
          progressName: progressName
        }).then(
          this.$emit("reGET", true) // 点击删除时 父组件重新获取数据   
        )
      }
    }
  }
</script>
<style>
  .progress {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
    color: rgb(255, 255, 255);
    background-color: rgb(106, 153, 255);
    box-shadow: 0px 0px 8px rgb(87, 87, 87)
  }

  .progressText {
    width: 100%;
    display: flex;
    flex-direction: row
  }

  .progressName {
    flex: 3;
    padding: 12px;
    font-size: 15px;
  }

  .progressType {
    flex: 2;
    padding: 12px;
    font-size: 15px;
  }

  .progressTime {
    flex: 3;
    padding: 12px;
    font-size: 15px;
  }

  .del2 {
    flex: 1;
    align-self: center;
  }

  .del2 button {
    width: 20px;
    height: 20px;
    background-color: rgb(217, 83, 79);
    color: #FFF;
    border: 0;
    border-radius: 5px;
  }

  .progressLoading {
    width: 100%;
    height: 40px;
  }

  .load {
    width: 0%;
    height: 40px;
  }

</style>