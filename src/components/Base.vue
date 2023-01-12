<template>
  <div v-if="noHeader === false" class="content-header row items-center">
    <h4 class="title">{{ title }}</h4>
    <div class="q-space"></div>
    <slot name="right-header"></slot>
  </div>
  <div :class="contentClass">
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
    verticalAlignment: {
      type: String,
      default: 'start',
    },
    horizontalAlignment: {
      type: String,
      default: 'start',
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'row',
    },
  },
  computed: {
    contentClass() {
      return `content-slot justify-${this.horizontalAlignment} items-${this.verticalAlignment} ${this.direction}`
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
  display: flex;
}
</style>
