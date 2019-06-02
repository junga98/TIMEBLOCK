<template>

  <router-link :to="url" tag="div" class="list">
    <slot name="funName"></slot>
    <slot name="svgIcon"></slot>
  </router-link>

</template>
<script>
  export default {
    props: ["url"],

  }
</script>