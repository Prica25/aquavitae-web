<template>
  <div id="confirmation-box-container">
    <div class="confirmation-box">
      <div class="confirmation-box-details">
        <div
          v-if="icon"
          class="confirmation-icon"
          :style="`font-size: ${iconSize}px; color: var(--q-${
            iconColor || 'primary'
          })`"
        >
          <i :class="`fa fa-${icon}`" />
        </div>
        <h4 class="confirmation-title text-center">{{ title }}</h4>
        <div v-if="description" class="confirmation-text">
          <span class="text-sm text-gray-500" v-html="description" />
        </div>
      </div>
      <div class="confirmation-buttons">
        <q-btn
          v-for="(button, index) in (buttons as Array<any>)"
          :key="'button-confirmation-' + index"
          class="confirmation-button"
          :color="button.color || 'primary'"
          :label="button.text"
          @click="closeDialog(button.result)"
          flat
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { closeDialog } from 'vue3-promise-dialog'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Are you sure?',
    },
    icon: {
      type: [Boolean, String],
      default: false,
    },
    iconSize: {
      type: Number,
      default: 64,
    },
    iconColor: {
      type: String,
      default: 'primary',
    },
    description: {
      type: [Boolean, String],
      default: false,
    },
    buttons: {
      type: Array,
      default: () => [{ text: 'Ok', result: true, color: 'primary' }],
    },
  },
  data() {
    return {
      closeDialog,
    }
  },
})
</script>

<style lang="css" scoped>
#confirmation-box-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.confirmation-box {
  font-family: inherit;
  -webkit-user-select: none; /* Safari */
  user-select: none;
}
.confirmation-box {
  width: 350px;
  background-color: white;
  border-radius: 25px;
}
.confirmation-box-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.confirmation-icon {
  margin: 4px;
}
.confirmation-title {
  margin: 4px;
  font-size: 28px;
  color: #646464;
}
.confirmation-text {
  color: #838383;
  margin-bottom: 4px;
}
.confirmation-buttons {
  display: flex;
  margin-top: 16px;
  border-radius: inherit;
}
.confirmation-button {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
  flex: 1;
}
.confirmation-button:first-of-type {
  border-bottom-left-radius: inherit;
}
.confirmation-button:last-of-type {
  border-bottom-right-radius: inherit;
  border-right: none;
}
</style>
