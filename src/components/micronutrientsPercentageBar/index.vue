<template>
  <div>
    <splitpanes @resize="updateSizes">
      <pane
        min-size="5"
        v-for="n in nutrients"
        :key="n.name"
        :size="n.percentage"
      >
        <span class="label">{{ n.name }}</span>
        <span class="value">{{ formatedPercentage(n.percentage) }}</span>
      </pane>
    </splitpanes>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import './style.css'

export default defineComponent({
  components: { Splitpanes, Pane },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    nutrients: {
      get() {
        return this.modelValue
      },
      set(value: any) {
        this.$emit(
          'update:modelValue',
          value.map((n) => ({
            name: n.name,
            percentage: Math.round(n.percentage),
          }))
        )
      },
    },
  },
  methods: {
    updateSizes(newSizes: any) {
      this.nutrients = this.nutrients.map((n, i) => ({
        name: n.name,
        percentage: newSizes[i].size,
      }))
    },
    formatedPercentage(percentage: number) {
      return Math.round(percentage) + '%'
    },
  },
})
</script>
