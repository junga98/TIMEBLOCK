<template>
  <div id="header" :style="{backgroundColor: headerBgColor}" v-show="headerShow">
    <div id="more" @click="showList">
      <svg xmlns="http://www.w3.org/2000/svg" class="barIcon" viewBox="0 0 448 512">
        <path
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        ></path>
      </svg>
    </div>

    <router-link tag="h2" to="/" id="title">{{title}}</router-link>
  </div>
</template>
<script>
export default {
  props: ["title"],
  computed: {
    listShow() {
      return this.$store.state.listShow;
    },
    headerBgColor() {
      return this.$store.state.headerBgColor;
    },
    headerShow() {
      return this.$store.state.headerShow;
    }
  },
  methods: {
    showList: function() {
      if (this.$store.state.listShow === false) {
        this.$store.commit("ShowList", true);
      } else {
        this.$store.commit("ShowList", false);
      }
    }
  }
};
</script>

<style>
#header {
  height: 10vh;
  overflow: hidden;
}

#title {
  color: rgb(255, 255, 255);
  z-index: 4;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1.7em;
  margin-block-start: 0.5em;
}

#more {
  position: absolute;
  left: 6%;
  top: 14px;
  border-radius: 5px;
  /* background-image: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%); */
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
  text-align: center;
  padding: 9px 9px 5px 9px;
  color: #fff;
  z-index: 5;
}

.barIcon {
  width: 20px;
  height: 20px;
  fill: #fff;
}
</style>