<template>
    <div class="presetBlock" :style="{borderColor:preset.color}">
        <div class="presetColor" :style="{background: preset.color}">
        </div>
        <span>{{preset.name}}</span>
        <div class="del">
            <button type="button" @click="delPreset">✘</button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["preset"],
        data() {
            return {}
        },
        computed: {},
        methods: {
            delPreset: function (e) {
                let presetName = e.path[2].dataset.presetname
                let userName = localStorage.getItem('userName')

                this.$store.dispatch('delPresets', {
                    userName : userName,
                    presetName: presetName
                });

            }
        }
    }
</script>
<style>
    .presetBlock {
        color: #FFF;
        width: 90px;
        height: 90px;
        margin: 8px;
        border: 2px solid #FFF;
        text-align: center;
        border-radius: 5px;
    }

    .presetBlock span {
        font-size: 15px;
    }

    .presetColor {
        width: 90px;
        height: 70px;
        border: 0;
        padding: 0;
        outline: none;
        background-color: #eee;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
    }

    .del {
        width: 20px;
        height: 20px;
        margin-top: -94px;
        margin-left: 72px;

    }

    .del button {
        width: 20px;
        height: 20px;
        background-color: rgb(255, 93, 93);
        color: #FFF;
        border: 0;
        border-radius: 5px;
    }

    @keyframes opacity {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>