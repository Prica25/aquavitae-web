<template>
  <q-card class="login-card">
    <div class="banner">
      <div title="Aquavitae" class="image"></div>
    </div>
    <div class="form">
      <q-input outlined v-model="username" placeholder="Email" dense>
        <template #prepend>
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
        <template #prepend>
          <q-icon size="16px" name="fa-solid fa-user" />
        </template>
        <template #append>
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
import PersonalDataService from '@/services/PersonalDataService'
import { openDialog } from 'vue3-promise-dialog'
import ChangePassword from './changePassword.vue'
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
    window.addEventListener('keydown', this.login)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.login)
  },
  methods: {
    async login(event: KeyboardEvent | Event) {
      if (!(event instanceof KeyboardEvent) || event.key === 'Enter') {
        try {
          let response = (await UserService.login(this.username, this.password))
            .data

          if (!response.user.last_access) {
            openDialog(ChangePassword)
          }

          this.store.login(response)

          let personalData = response.user
            ? (await PersonalDataService.show(response.user.id)).data[0]
            : null

          this.store.updatePersonalData(personalData)

          this.$router.push('/')
        } catch (err) {
          if (
            (err as any).response?.data?.detail?.[0]?.msg ===
            'Invalid credentials.'
          ) {
            console.log('password errada')
          } else {
            console.log('Algum erro aconteceu')
          }
        }
      }
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
  width: 100%;
  height: 200px;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  display: flex;
  align-items: end;
  justify-content: center;
}

.banner .image {
  background: url('../../assets/logo.svg');
  background-repeat: no-repeat;
  height: 180px;
  width: calc(978 / 575 * 180px);
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
