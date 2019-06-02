<template>
  <div class="timeContainer">
    <div v-for="block in childblock" :key="block.index" :data-id="block.id" @click="setBlock" class="timeblock" :style="{background: block.color,width: block.blockWidth}">{{block.name}}</div>
  </div>
</template>
<script>

  export default {
    props: ['childblock'],
    data() {
      return {}
    },
    computed: {
      newName: function () {
        return this.$store.state.newName
      },
      newColor: function () {
        return this.$store.state.newColor
      }
    },
    methods: {
      setBlock: function (e) {
        //  console.log(e.path[1].dataset.idTime)
        this.$store.commit('SETsetNewBlock', true)

        let dataIdTime = e.path[1].dataset.idTime
        // console.log(dataIdTime.length)
        if (dataIdTime.length == 6) {
          // this.$data.clickBlockTimeId = dataIdTime.slice(5, 6)
          let clickBlockTimeId = dataIdTime.slice(5, 6)
          this.$store.commit('SETclickBlockTimeId', clickBlockTimeId)
        } else if (dataIdTime.length == 7) {
          // this.$data.clickBlockTimeId = dataIdTime.slice(5, 7)
          let clickBlockTimeId = dataIdTime.slice(5, 7)
          this.$store.commit('SETclickBlockTimeId', clickBlockTimeId)
        }


        // this.$data.clickBlockId = e.target.dataset.id;
        let clickBlockId = e.target.dataset.id;
        // console.log(clickBlockId)

        this.$store.commit('SETclickBlockId', clickBlockId)
        //  let nowHour = this.$data.nowHour;
        // let clickBlockTimeId = this.$data.clickBlockTimeId;

        // console.log(clickBlockTimeId)
        let clickBlockTimeId = this.$store.state.clickBlockTimeId;

        // this.$data.newName = eval(
        let newName = eval(
          "this.$store.state.blocks.block" +
          clickBlockTimeId +
          "[" +
          e.target.dataset.id +
          "].name"
        );
        // console.log(newName)
        this.$store.commit('SETnewName', newName)

        // this.$data.newColor = eval(
        let newColor = eval(
          "this.$store.state.blocks.block" +
          clickBlockTimeId +
          "[" +
          e.target.dataset.id +
          "].color"
        );
        this.$store.commit('SETnewColor', newColor)

      },
    }
  }
</script>
<style>
  #contentScroll .timeContainer {
    width: 100%;
    height: 60px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgba(114, 114, 114, 0.185)
  }

  #contentScroll .timeContainer .timeblock {
    width: 0%;
    height: 60px;
    color: #efefef;
    text-align: center;
    animation: blockShow 1s ease-out;
  }
</style>