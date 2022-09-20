<template>
  <q-dialog v-model="visible">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import FoodService from '@/services/FoodService'

export default defineComponent({
  props: ['modelValue', 'food'],
  emits: ['update:modelValue'],
  computed: {
    visible: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  watch: {
    visible: {
      async handler() {
        if (this.visible) {
          const food = (await FoodService.show(this.food)).data
          console.log(food)
        }
      },
      immediate: true,
    },
  },
})
</script>
