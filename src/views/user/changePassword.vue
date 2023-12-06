<template>
  <div id="confirmation-box-container">
    <div class="confirmation-box">
      <q-form ref="form" @submit="save">
        <div class="confirmation-box-details">
          <div
            class="confirmation-icon"
            :style="`font-size: 64px; color: var(--q-primary)`"
          >
            <i :class="`fa-solid fa-key`" />
          </div>
          <div class="confirmation-content">
            <q-input
              outlined
              dense
              v-model="password"
              label="Nova Password"
              type="password"
              hide-bottom-space
              style="margin: 12px 0"
              :rules="[
                (val: string) =>
                  val.length >= 8 ||
                  'A password deve ter mais de 8 caracteres',
              ]"
            />
            <q-input
              outlined
              dense
              v-model="repeatedPassword"
              label="Confirmar Nova Password"
              type="password"
              hide-bottom-space
              :rules="password ? [
              (val: string) =>
                (val === password) ||
                'As passwords são diferentes',
            ]: []"
            />
          </div>
        </div>
        <div class="confirmation-buttons">
          <q-btn
            class="confirmation-button"
            color="primary"
            label="Alterar Password"
            type="submit"
            flat
          />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import UserService from '@/services/UserService'
import { closeDialog } from 'vue3-promise-dialog'

export default defineComponent({
  data() {
    return {
      password: '',
      repeatedPassword: '',
    }
  },
  methods: {
    async save() {
      try {
        await UserService.put({ password: this.password })
        closeDialog(true)
      } catch (err) {}
    },
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
.confirmation-content {
  width: 100%;
  padding: 0 24px;
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
