<template>
  <transition name="slide-left">
    <div id="tip">
      <div id="tip_title">提示</div>
      <div id="tip_content">
        <slot name="tip"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {};
</script>
<style>
#tip {
  position: absolute;
  width: 70%;
  background-color: rgb(151, 151, 151);
  color: #fff;
  border-radius: 15px;
  top: 40%;
  box-shadow: 1px 1px 8px rgb(70, 70, 70);
  z-index: 15;
  /* animation: alertTip .2s ease-in-out; */
}

#tip_title {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 1.5rem;
  font-size: 15px;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background-color: rgb(204, 95, 95);
}

#tip_content {
  padding: 1.5rem;
}

@keyframes alertTip {
  0% {
    transform: rotateX(110deg);
  }

  100% {
    transform: rotateX(0deg);
  }
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
</style>