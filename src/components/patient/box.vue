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
      <q-icon
        name="fa-solid fa-apple-whole"
        @click="$emit('open-nutrition-plan', user)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    user: {
      type: Object as any,
      required: true,
    },
    personalData: {
      type: Object as any,
      required: false,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    birthdayDate() {
      if (!this.personalData) {
        return 'Sem dados'
      }

      const date = new Date(this.personalData.birthday)
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
      if (this.personalData) {
        return `${this.personalData.first_name} ${this.personalData.last_name}`
      } else {
        return 'Sem Nome'
      }
    },
  },
})
</script>
<style scoped>
.user-box {
  min-width: 375px;
  max-width: 375px;
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
  margin: 4px 0;
  font-size: 14px;
  color: #b9b9b9;
  cursor: pointer;
}
</style>
