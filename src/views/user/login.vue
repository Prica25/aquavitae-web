<template>
  <q-card class="login-card">
    <div class="banner">
      <q-icon name="fa-solid fa-droplet" class="icon" />
      <span>Aquavitae</span>
    </div>
    <div class="form">
      <q-input outlined v-model="username" placeholder="Email" dense>
        <template v-slot:prepend>
          <q-icon size="16px" name="fa-solid fa-user" />
        </template>
      </q-input>
      <q-input
        class="q-my-md"
        outlined
        v-model="password"
        placeholder="Password"
        :type="showPassword ? 'text' : 'password'"
        dense
      >
        <template v-slot:prepend>
          <q-icon size="16px" name="fa-solid fa-user" />
        </template>
        <template v-slot:append>
          <q-icon
            size="16px"
            :name="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <q-checkbox v-model="keepLogin" label="Manter sessão inciada" />
      <q-btn
        class="login-btn"
        round
        color="primary"
        icon="fa-solid fa-chevron-right"
        @click="login"
      />
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserService from '@/services/UserService'

import { useUserStore } from '@/stores/user'

export default defineComponent({
  data() {
    return {
      store: useUserStore(),
      username: '',
      password: '',
      showPassword: false,
      keepLogin: false,
    }
  },
  created() {
    if (this.store.getToken) this.store.logout()
  },
  methods: {
    async login() {
      let response = (await UserService.login(this.username, this.password))
        .data

      this.store.login(response)
      this.$router.push('/')
    },
  },
})
</script>

<style scoped>
.login-card {
  height: 402px;
  width: 350px;
  border-radius: 10px;
}

.banner {
  background: var(--q-primary);
  width: 100%;
  height: 200px;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  position: relative;
  overflow: hidden;
}

.banner span {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  position: absolute;
  bottom: 25px;
  left: 25px;
  color: #f5f7f9;
}

.banner .icon {
  font-size: 220px;
  position: absolute;
  right: -70px;
  top: -40px;
  color: var(--q-secondary);
}

.form {
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
}

.form .q-field {
  width: 80%;
}

.form .login-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  right: -16px;
  bottom: 12px;

  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
}
</style>
