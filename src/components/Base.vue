<template>
  <div class="content-header row items-center">
    <h4 class="title">{{ title }}</h4>
    <div class="q-space"></div>
    <slot name="right-header"></slot>
  </div>
  <div class="content-slot">
    <slot name="content"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
<style scoped>
.title {
  font-size: 30px;
  color: #646464;
  margin: 0;
}
.content-header {
  margin-bottom: 16px;
}
.content-slot {
  flex: 1 1 auto;
  width: 80%;
  margin: 0 auto;
}
</style>
