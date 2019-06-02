<template>
    <div id="preset">
        <div id="presetBox">
            <pre-set-block v-for="(preset,index) in presets" :key="index" :preset="preset" :data-presetName="preset.name"></pre-set-block>
            <button id="addBlock" @click="addBlock" type="button">+</button>
        </div>
        <set-new-block v-show="setNewBlock"></set-new-block>

        <alert-tip v-show="tipShow">
            <template slot="tip">
                {{tip}}
            </template>
        </alert-tip>
    </div>
</template>
<script>
    import store from "./../store/store.js";
    import setNewBlock from './../components/setNewBlock.vue'
    import alertTip from './../components/alertTip.vue'
    import preSetBlock from './../components/preSetBlock.vue'


    export default {
        components: {
            alertTip,
            setNewBlock,
            preSetBlock
        },
        data() {
            return {}
        },
        computed: {
            presets() {
                return this.$store.state.presets;
            },
            title() {
                return this.$store.state.title;
            },
            setNewBlock() {
                return this.$store.state.setNewBlock;
            },
            tip() {
                return this.$store.state.tip;
            },
            tipShow() {
                return this.$store.state.tipShow;
            },
            addNewBlock() {
                return this.$store.state.addNewBlock;
            }
        },
        methods: {
            addBlock: function () {
                store.commit("SETsetNewBlock", true);
            },
            alertTip() {
                store.commit("AlertShow", true);
            }
        },
        created() {

            let userName = localStorage.getItem('userName')
            this.$store.dispatch('getPresets', {
                userName: userName
            });
        },
        mounted() {
            store.commit("headerShow", true)
            store.commit('ShowList', false)
            store.commit('Showpreset', false) // 设置面板组件没有预设选择项

        }
    }
</script>
<style scoped>
    #preset {
        width: 100%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #presetBox {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around
    }

    #addBlock {
        width: 92px;
        height: 92px;
        margin: 8px;
        font-size: 30px;
        color: #e9e9e9;
        border: 0;
        border-radius: 10px;
        background-color: rgba(148, 148, 148, 0.11);
    }
</style>