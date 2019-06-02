import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: "TIMEBLOCK",
    headerShow: false,
    listShow: false,
    loading: false,
    loadingTip: '',
    headerBgColor: '',
    clickBlockTimeId: "0",
    clickBlockId: "0",
    setNewBlock: false,
    newName: "",
    newColor: "#efefef",
    presetSelect: false,
    tip: '',
    del: false,
    addNewBlock: false,
    tipShow: false,
    nav: [{
        name: "主页",
        svgPath: "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z",
        url: '/'
      },
      {
        name: "预设",
        svgPath: "M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z",
        url: '/preset'
      },
      {
        name: "统计",
        svgPath: "M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z",
        url: '/visualData'
      },
      {
        name: "目标",
        svgPath: "M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z",
        url: '/progress'
      }
    ],
    presets: [],

    blocks: {
      "block1": [],
      "block2": [],
      "block3": [],
      "block4": [],
      "block5": [],
      "block6": [],
      "block7": [],
      "block8": [],
      "block9": [],
      "block10": [],
      "block11": [],
      "block12": []
    }
  },
  mutations: {
    SETclickBlockTimeId(state, clickBlockTimeId) {
      state.clickBlockTimeId = clickBlockTimeId
    },
    SETclickBlockId(state, clickBlockId) {
      state.clickBlockId = clickBlockId
    },
    SETsetNewBlock(state, display) {
      state.setNewBlock = display
    },
    SETnewName(state, newName) {
      state.newName = newName
    },
    SETnewColor(state, newColor) {
      state.newColor = newColor
    },
    APIBLOCKS(state, blocks) {
      /*全部清空再填入数据 */
      state.blocks.block1.splice(0, state.blocks.block1.length)
      state.blocks.block2.splice(0, state.blocks.block2.length)
      state.blocks.block3.splice(0, state.blocks.block3.length)
      state.blocks.block4.splice(0, state.blocks.block4.length)
      state.blocks.block5.splice(0, state.blocks.block5.length)
      state.blocks.block6.splice(0, state.blocks.block6.length)
      state.blocks.block7.splice(0, state.blocks.block7.length)
      state.blocks.block8.splice(0, state.blocks.block8.length)
      state.blocks.block9.splice(0, state.blocks.block9.length)
      state.blocks.block10.splice(0, state.blocks.block10.length)
      state.blocks.block11.splice(0, state.blocks.block11.length)
      state.blocks.block12.splice(0, state.blocks.block12.length)

      if (blocks.block1) {
        state.blocks.block1 = blocks.block1
      }
      if (blocks.block2) {
        state.blocks.block2 = blocks.block2
      }
      if (blocks.block3) {
        state.blocks.block3 = blocks.block3
      }
      if (blocks.block4) {
        state.blocks.block4 = blocks.block4
      }
      if (blocks.block5) {
        state.blocks.block5 = blocks.block5
      }
      if (blocks.block6) {
        state.blocks.block6 = blocks.block6
      }
      if (blocks.block7) {
        state.blocks.block7 = blocks.block7
      }
      if (blocks.block8) {
        state.blocks.block8 = blocks.block8
      }
      if (blocks.block9) {
        state.blocks.block9 = blocks.block9
      }
      if (blocks.block10) {
        state.blocks.block10 = blocks.block10
      }
      if (blocks.block11) {
        state.blocks.block11 = blocks.block11
      }
      if (blocks.block12) {
        state.blocks.block12 = blocks.block12
      } else {
        state.blocks.block1.splice(0, state.blocks.block12.length)
      }
    },

    // Loading动画
    ShowLoading(state, show) {
      state.loading = show.show
      state.loadingTip = show.tip
    },

    // 头部栏显示
    headerShow(state, show) {
      state.headerShow = show
    },

    // 标题栏在<统计>页改变背景色
    SETheaderBgColor(state, bgColor) {
      state.headerBgColor = bgColor
    },
    // 导航栏显示
    ShowList(state, listShow) {
      state.listShow = listShow
    },

    DELpreset(state, del) {

      let presets = state.presets

      for (let preset in presets) {
        if (presets[preset].name == del) {
          presets.splice(preset, 1) // 删除对应的预设块
        }
      }
    },

    /* 设置面板组件 根据路由不同 有不同的展示 */
    Showpreset(state, show) {
      state.presetSelect = show
    },

    /*  提示弹框  */
    AlertShow(state, show) {
      state.tipShow = show
      setTimeout(() => {
        state.tipShow = false
      }, 1500);
    },

    AlertTip(state, tip) {
      state.tip = tip
    },

    /* page-preset页  */
    PushNewBlock(state, obj) {
      let name = obj.newName
      let color = obj.newColor
      let newBlock = {
        name: name,
        color: color
      }
      state.presets.push(newBlock)


    },

    /* page-home页 */
    SETblock1Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block1[BlockId].name = name
    },
    SETblock1Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block1[BlockId].color = color
    },
    SETblock2Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block2[BlockId].name = name
    },
    SETblock2Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block2[BlockId].color = color
    },
    SETblock3Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block3[BlockId].name = name
    },
    SETblock3Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block3[BlockId].color = color
    },
    SETblock4Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block4[BlockId].name = name
    },
    SETblock4Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block4[BlockId].color = color
    },
    SETblock5Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block5[BlockId].name = name
    },
    SETblock5Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block5[BlockId].color = color
    },
    SETblock6Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block6[BlockId].name = name
    },
    SETblock6Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block6[BlockId].color = color
    },
    SETblock7Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block7[BlockId].name = name
    },
    SETblock7Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block7[BlockId].color = color
    },
    SETblock8Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block8[BlockId].name = name
    },
    SETblock8Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block8[BlockId].color = color
    },
    SETblock9Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block9[BlockId].name = name
    },
    SETblock9Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block9[BlockId].color = color
    },

    SETblock10Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block10[BlockId].name = name
    },
    SETblock10Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block10[BlockId].color = color
    },
    SETblock11Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block11[BlockId].name = name
    },
    SETblock11Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block11[BlockId].color = color
    },
    SETblock12Name(state, newBlockName) {
      let BlockId = newBlockName.clickBlockId
      let name = newBlockName.BlockName
      state.blocks.block12[BlockId].name = name
    },
    SETblock12Color(state, newBlockColor) {
      let BlockId = newBlockColor.clickBlockId
      let color = newBlockColor.BlockColor
      state.blocks.block12[BlockId].color = color
    },



    pushBlock1(state, pushBlock1) {
      state.blocks.block1.push(pushBlock1.pushData)
    },
    pushBlock2(state, pushBlock2) {
      state.blocks.block2.push(pushBlock2.pushData)
    },
    pushBlock3(state, pushBlock3) {
      state.blocks.block3.push(pushBlock3.pushData)
    },
    pushBlock4(state, pushBlock4) {
      state.blocks.block4.push(pushBlock4.pushData)
    },
    pushBlock5(state, pushBlock5) {
      state.blocks.block5.push(pushBlock5.pushData)
    },
    pushBlock6(state, pushBlock6) {
      state.blocks.block6.push(pushBlock6.pushData)
    },
    pushBlock7(state, pushBlock7) {
      state.blocks.block7.push(pushBlock7.pushData)
    },
    pushBlock8(state, pushBlock8) {
      state.blocks.block8.push(pushBlock8.pushData)
    },
    pushBlock9(state, pushBlock9) {
      state.blocks.block9.push(pushBlock9.pushData)
    },
    pushBlock10(state, pushBlock10) {
      state.blocks.block10.push(pushBlock10.pushData)
    },
    pushBlock11(state, pushBlock11) {
      state.blocks.block11.push(pushBlock11.pushData)
    },
    pushBlock12(state, pushBlock12) {
      state.blocks.block12.push(pushBlock12.pushData)
    },


    // 路由方法
    Get_persets: (state, presets) => {
      state.presets = presets
    }

  },
  actions: {
    getPresets(store, {
      userName
    }) {
      store.commit("ShowLoading", {
        show: true,
        tip: '努力加载中'
      })

      let params = {
        userName: userName
      }

      api.getPresets(params) // 发起请求

        .then(res => {
          setTimeout(() => {
            store.commit("Get_persets", res.data)
            store.commit("ShowLoading", {
              show: false,
              tip: ''
            })
          }, 1000);
        }).catch(error => {
          reject(error)
        })
    },

    addPresets(store, {
      newName,
      newColor,
      userName
    }) {
      let newPreset = {
        newName: newName,
        newColor: newColor
      }
      store.commit("PushNewBlock", newPreset)
      store.commit("ShowLoading", {
        show: true,
        tip: '上传中'
      })

      let newPreset2 = {
        newName: newName,
        newColor: newColor,
        userName: userName
      }

      api.addPresets(newPreset2)
        .then(res => {
          setTimeout(() => {
            console.log(res)
            store.commit("ShowLoading", {
              show: false,
              tip: ''
            })
          }, 500);

        }).catch(error => {
          reject(error)
        })
    },

    delPresets(store, {
      userName,
      presetName
    }) {

      let params = {
        userName: userName,
        presetName: presetName
      }

      store.commit("DELpreset", presetName)
      store.commit("ShowLoading", {
        show: true,
        tip: '删除中'
      })

      api.delPresets(params)

        .then(res => {
          setTimeout(() => {
            console.log(res)
            store.commit("ShowLoading", {
              show: false,
              tip: ''
            })
          }, 500);

        }).catch(error => {
          reject(error)
        })
    },

    // 首页
    getDayBlocks(store, { // 获取当天blocks
      userName,
      type
    }) {
      // store.commit("DELpreset", presetName)
      store.commit("ShowLoading", {
        show: true,
        tip: '获取中'
      })

      let params = {
        userName: userName,
        type: type
      }
      api.getDayBlocks(params)

        .then(res => {
          setTimeout(() => {
            // console.log(res);

            if (res == "" || res == null) {
              store.commit("AlertShow", true)
              store.commit("AlertTip", "当天还没有记录，请点击cutit开始第一条记录")
              store.commit("ShowLoading", {
                show: false,
                tip: ''
              })
            } else {
              let blocks = res.blocks[0]
              store.commit("APIBLOCKS", blocks)
              store.commit("AlertShow", true)
              store.commit("AlertTip", "获取成功")
              store.commit("ShowLoading", {
                show: false,
                tip: ''
              })
            }
          }, 500);

        }).catch(error => {
          reject(error)
        })
    },

    addBlocks(store, { // 新增blocks
      userName,
      clickBlockTimeId,
      clickBlockId,
      BlockName,
      time,
      BlockWidth,
      BlockColor
    }) {

      store.commit("ShowLoading", {
        show: true,
        tip: '添加中'
      })

      let params = {
        userName: userName,
        TimeId: clickBlockTimeId,
        BlockId: clickBlockId,
        BlockName: BlockName,
        time: time,
        BlockWidth: BlockWidth,
        BlockColor: BlockColor
      }
      console.log(params);

      api.addBlocks(params)

        .then(res => {
          setTimeout(() => {

            store.commit("AlertShow", true)
            store.commit("AlertTip", res)

            // 新增完成后获取 新数据
            let params2 = {
              userName: userName,
              type: "today"
            }
            api.getDayBlocks(params2).then(res2 => {
              let blocks = res2.blocks[0]
              store.commit("APIBLOCKS", blocks)
            })

            store.commit("ShowLoading", {
              show: false,
              tip: ''
            })
          }, 500);

        }).catch(error => {
          reject(error)
        })
    }
  }
})

export default store