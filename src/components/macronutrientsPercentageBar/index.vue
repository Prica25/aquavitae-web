<template>
  <div>
    <splitpanes @resize="updateSizes">
      <pane
        min-size="10"
        :key="macronutrient.name"
        :size="macronutrient.percentage"
      >
        <span class="label">{{ macronutrient.name }}</span>
        <span class="value">{{
          formatedPercentage(macronutrient.percentage)
        }}</span>
      </pane>
      <pane class="empty" />
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
  emits: ['update:modelValue', 'change'],
  computed: {
    macronutrient: {
      get() {
        return this.modelValue
      },
      set(value: any) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    updateSizes(newSizes: any) {
      this.macronutrient = {
        ...this.macronutrient,
        percentage: newSizes[0].size,
      }
      this.$emit('change')
    },
    formatedPercentage(percentage: number) {
      return Math.round(percentage) + '%'
    },
  },
})
</script>
