<template>
  <div id="app">
    <v-header :title="title"></v-header>

    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <div id="listShow" v-show="listShow" @click="changeRouter">
      <navbar v-for="item in nav" :key="item.key" :url="item.url">
        <template slot="funName">{{item.name}}</template>
        <svg slot="svgIcon" class="listIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path :d="item.svgPath"></path>
        </svg>
      </navbar>
    </div>

    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import vHeader from './components/header.vue'
  import navbar from './components/nav.vue'
  import loading from './components/loading.vue'

  export default {
    name: 'App',
    components: {
      navbar,
      vHeader,
      loading
    },
    data() {
      return {
        transitionName: ""
      };
    },
    computed: {
      title() {
        return this.$store.state.title;
      },
      listShow() {
        return this.$store.state.listShow;
      },
      nav() {
        return this.$store.state.nav;
      },
      loading() {
        return this.$store.state.loading
      }
    },
    methods: {
      changeRouter: function () {
        this.$store.commit('ShowList', false)
      }
    },
    mounted() {},
    watch: {
      $route(to, from) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      }
    }
  }
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 250ms;
    /* position: absolute; */
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate(-100%, 0);
  }

  #listShow {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    background-color: rgba(68, 68, 68, 0.5);
    z-index: 4
  }

  .list {
    flex: 0 1 auto;
    width: 130px;
    height: 130px;
    margin: 10px;
    border-radius: 100%;
    background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(0);
  }

  .list:nth-child(1) {
    animation: listMove 0.4s 0s ease forwards;
  }

  .list:nth-child(2) {
    animation: listMove 0.4s 0.1s ease forwards;
  }

  .list:nth-child(3) {
    animation: listMove 0.4s 0.2s ease forwards;
    align-self: flex-start;
  }

  .list:nth-child(4) {
    animation: listMove 0.4s 0.3s ease forwards;
    align-self: flex-start;
  }

  .listIcon {
    margin-top: 5px;
    width: 45px;
    height: 45px;
    fill: #fff;
  }
</style>