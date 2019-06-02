<template>
  <div id="setNewBlock" v-show="setNewBlock">
    <input type="text" placeholder="新时间块名字" required v-model="newName">
    <input type="color" placeholder="时间块颜色" v-model="newColor">
    
    <select id="select" v-if="presetSelect" v-model="selectPreset" @change="usePreset">
      <option
        v-for="(preset, index) in presets"
        :key="index"
        :value="preset.name"
        :style="{backgroundColor: preset.color}"
      >{{preset.name}}</option>
    </select>

    <div>
      <button @click="SetIt">确定</button>
      <button @click="closeSet">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectPreset: ""
    };
  },
  computed: {
    setNewBlock() {
      return this.$store.state.setNewBlock;
    },
    presets() {
      return this.$store.state.presets;
    },
    page() {
      return this.$store.state.page;
    },
    presetSelect() {
      return this.$store.state.presetSelect;
    },
    newName: {
      get() {
        return this.$store.state.newName;
      },
      set(value) {
        this.$store.commit("SETnewName", value);
      }
    },
    newColor: {
      get() {
        return this.$store.state.newColor;
      },
      set(value) {
        this.$store.commit("SETnewColor", value);
      }
    }
  },
  methods: {
    closeSet: function() {
      this.$store.commit("SETsetNewBlock", false);
    },
    SetIt: function() {
      const _this  =this

      if (this.$store.state.presetSelect == true) {
        let clickBlockTimeId = this.$store.state.clickBlockTimeId;
        let clickBlockId = this.$store.state.clickBlockId;

        // let nowHour = this.$data.nowHour;
        //  console.log("this.$data.blocks.block" + nowHour + "[" + clickBlockId + "].name  = this.$data.newName")
        if (this.$store.state.newName != "") {
          let newName = this.$store.state.newName;
          let newColor = this.$store.state.newColor;

          let userName = localStorage.getItem("userName");
          let str = "this.$store.state.blocks.block" + clickBlockTimeId;
          let block = eval(str);

          let time = block[block.length - 1].time;
          let BlockWidth = block[block.length - 1].blockWidth;

          this.$store.dispatch("addBlocks", {
            userName: userName,
            clickBlockTimeId: clickBlockTimeId,
            clickBlockId: clickBlockId,
            BlockName: newName,
            time: time,
            BlockWidth: BlockWidth,
            BlockColor: newColor
          });
        } else {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "请命名时间块");
          return false;
        }

        this.$data.newName = "";
        this.$data.newColor = "#FFFFFF";
        this.$store.commit("SETsetNewBlock", false);
      } else {
        let newName = this.$store.state.newName;
        let newColor = this.$store.state.newColor;
        let STOREpresets = this.$store.state.presets;

        if (this.$store.state.newName != "") {
          for (let preset in STOREpresets) {
            if (STOREpresets[preset].name == newName) {
              _this.$store.commit("AlertShow", true);
              _this.$store.commit("AlertTip", "已存在该命名的时间块");
              return false;
            }
          }

          let userName = localStorage.getItem("userName");
          let newPreset = {
            newName: newName,
            newColor: newColor,
            userName: userName
          };
          this.$store.dispatch("addPresets", newPreset);
        } else {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "请命名新时间块");
          return false;
        }

        this.$store.commit("SETsetNewBlock", false);
        this.$store.commit("SETnewName", "");
        this.$store.commit("SETnewColor", "#FFFFFF");
      }
    },
    usePreset: function() {
      let presetName = this.$data.selectPreset;

      this.$store.commit("SETnewName", presetName);

      let presets = this.$store.state.presets;
      for (let preset in presets) {
        if (presets[preset].name == presetName) {
          this.$store.commit("SETnewColor", presets[preset].color);
        }
      }
    }
  },
  mounted() {
    this.$store.commit("SETnewName", "");
    this.$store.commit("SETnewColor", "#FFFFFF");
  }
};
</script>
<style>
#setNewBlock {
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

#setNewBlock input {
  width: 80%;
  height: 24px;
  margin-top: 8px;
  text-align: center;
  border-radius: 10px;
}

#setNewBlock div button {
  width: 90px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  margin-top: 20px;
  padding: 10px;
  background-color: rgb(86, 145, 255);
}

#select {
  width: 80%;
  height: 24px;
  margin-top: 8px;
  text-align: center;
  border-radius: 10px;
  text-align-last: center;
  color: #334433;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
}

#select option {
  text-align: center;
}

#select option::-ms-expand {
  display: none;
}

/* --背景色字体颜色--*/
#select option:hover {
  background-color: none;
}

#select option:active {
  background-color: none;
}

#select option:checked {
  color: inherit;
  background-color: inherit;
}
</style>