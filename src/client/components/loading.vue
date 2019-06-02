<template>
  <div id="loading">
    <div id="loadingCircle">
      <div id="circle">
        <div id="line"></div>
      </div>
    </div>
    <div id="loadingText">{{loadingTip}}</div>
  </div>
</template>
<script>
export default {
  computed: {
    loadingTip() {
      return this.$store.state.loadingTip;
    }
  }
};
</script>

<style>
#loading {
  position: absolute;
  width: 78px;
  height: 86px;
  top: 40%;
  left: 50%;
  margin-left: -39px;
  z-index: 20;
  color: #fff;
  text-align: center;
}

#loadingCircle {
  animation: scale 1.2s ease-in-out infinite;
}

#circle {
  width: 70px;
  height: 70px;
  border: 4px solid #fff;
  border-radius: 100%;
  background-color: rgb(76, 187, 100);
  animation: circle 1.2s ease-in-out infinite;
}

#line {
  width: 4px;
  height: 30px;
  border-radius: 4px;
  margin-top: 7px;
  margin-left: 35px;
  background-color: #fff;
}

#loadingText {
  margin-top: 12px;
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
    background-color: rgb(92, 184, 92);
  }

  50% {
    background-color: rgb(150, 235, 150);
  }

  100% {
    transform: rotate(1080deg);
    background-color: rgb(92, 184, 92);
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>