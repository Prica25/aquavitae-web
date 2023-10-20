<template>
  <base-page
    title="Utilizador"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #content>
      <q-form @submit="registerUser">
        <div
          class="box-default q-pa-xl text-center form-card row"
          style="width: 75vw"
        >
          <div class="col">
            <q-uploader
              label="Profile Photo"
              accept=".jpg, .jpeg, .png"
              @uploaded="handleProfilePhotoUpload"
            />
          </div>
          <div class="col">
            <q-input v-model="user.email" label="Email" outlined dense />
            <q-input
              v-model="user.password"
              label="Password"
              type="password"
              outlined
              dense
            />
            <q-select
              v-model="user.role"
              label="Role"
              outlined
              dense
              :options="roles"
            />
          </div>
          <div class="col">
            <q-input
              v-model="user.firstName"
              label="First Name"
              outlined
              dense
            />
            <q-input v-model="user.lastName" label="Last Name" outlined dense />
            <q-date v-model="user.birthday" label="Birthday" outlined dense />
          </div>
        </div>
        <q-btn type="submit" color="primary" label="Register" />
      </q-form>
    </template>
  </base-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      user: {
        email: '',
        password: '',
        role: null,
        firstName: '',
        lastName: '',
        birthday: null,
        profilePhoto: null,
      },
      roles: ['Admin', 'User', 'Guest'],
    }
  },
  methods: {
    registerUser() {
      // You can handle user registration logic here
      // For example, send the registration data to a server
      console.log('Registering user:', this.user)
      // Reset the form after submission
      this.user = {
        email: '',
        password: '',
        role: null,
        firstName: '',
        lastName: '',
        birthday: null,
        profilePhoto: null,
      }
    },
    handleProfilePhotoUpload(file) {
      // Handle profile photo upload here
      console.log('Uploaded profile photo:', file)
      this.user.profilePhoto = file
    },
  },
})
</script>
