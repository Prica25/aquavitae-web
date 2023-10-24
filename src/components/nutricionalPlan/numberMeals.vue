<template>
  <div class="row number-meals box-default" style="width: 100%">
    <span>Refeições</span>
    <q-space />
    <q-select
      outlined
      v-model="number"
      :options="options"
      dense
      emit-value
      :display-value="selectedLabel"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: Number,
  },
  data() {
    return {
      options: [
        { label: '1 Refeição', value: 1, cannotSelect: false },
        { label: '2 Refeições', value: 2, cannotSelect: false },
        { label: '3 Refeições', value: 3, cannotSelect: false },
        { label: '4 Refeições', value: 4, cannotSelect: false },
        { label: '5 Refeições', value: 5, cannotSelect: false },
      ],
    }
  },
  computed: {
    number: {
      get: function () {
        return this.modelValue
      },
      set: function (value: number) {
        this.$emit('update:modelValue', value)
      },
    },
    selectedLabel() {
      return this.options.find((o) => o.value === this.number)?.label || 'N/S'
    },
  },
})
</script>

<style scoped>
.number-meals {
  height: 60px;
  background: white;
  align-items: center;
  padding: 0 15px;
  margin: 20px 0;
}

.number-meals > span {
  color: #646464;
  font-weight: bold;
  font-size: 16px;
}
</style>
