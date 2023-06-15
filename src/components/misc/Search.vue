<template>
  <q-input class="search" filled v-model="search" placeholder="Procurar">
    <template v-slot:prepend>
      <q-icon size="16px" name="fa-solid fa-magnifying-glass" />
    </template>
  </q-input>
  <q-btn
    v-if="addButton"
    class="btn"
    color="primary"
    :label="buttonText"
    @click="$emit('click-button')"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['click-button', 'update:modelValue'],
  props: {
    addButton: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: 'Adicionar',
    },
    modelValue: String,
  },
  computed: {
    search: {
      get: function () {
        return this.modelValue
      },
      set: function (value: string) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>
<style scoped>
.search :deep(.q-field__control),
.search :deep(.q-field__control::before) {
  background: white !important;
}
.search {
  width: 25%;
  min-width: 200px;
}

.btn {
  height: 56px;
  margin-left: 16px;
}
</style>
