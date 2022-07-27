<template>
  <div class="user-box row">
    <div class="col-4 items-center justify-center flex">
      <q-avatar
        size="80px"
        color="primary"
        text-color="white"
        icon="fa-solid fa-user"
      />
    </div>
    <div class="col justify-center user-details">
      <span class="user-name">{{ fullName }}</span>
      <span class="birthday">
        <q-icon name="fa-solid fa-baby-carriage"></q-icon>
        {{ birthdayDate }}
      </span>
      <span class="user-email">
        <q-icon name="fa-solid fa-envelope" />
        {{ user.email }}
      </span>
    </div>
    <div class="user-actions">
      <q-icon name="fa-solid fa-eye" @click="$emit('view', user)" />
      <q-icon name="fa-solid fa-pencil" @click="$emit('edit', user)" />
      <q-icon name="fa-solid fa-trash" @click="$emit('delete', user)" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    birthdayDate() {
      const date = new Date(this.user.birthday)
      const today = new Date()

      let age = today.getFullYear() - date.getFullYear()
      const m = today.getMonth() - date.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--
      }

      return `${[
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear(),
      ].join('/')} (${age})`
    },
    fullName() {
      return `${this.user.first_name} ${this.user.last_name}`
    },
  },
})
</script>
<style scoped>
.user-box {
  min-width: 400px;
  max-width: 400px;
  height: 120px;
  background: white;
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
  position: relative;
}

.user-details {
  display: flex;
  flex-direction: column;
  color: #646464;
}

.user-name {
  font-weight: bold;
  font-size: 20px;
  color: #555;
  margin-bottom: 8px;
}

.user-actions {
  position: absolute;
  top: 18px;
  right: 16px;
  flex-direction: column;
  display: flex;

  transition: visibility 0s, opacity 0.25s linear;
  visibility: hidden;
  opacity: 0;
}

.user-box:hover .user-actions {
  visibility: visible;
  opacity: 1;
}

.user-actions .q-icon {
  margin: 5px 0;
  font-size: 18px;
  color: #b9b9b9;
  cursor: pointer;
}
</style>