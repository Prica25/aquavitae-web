<template>
  <div class="user-box row box-default">
    <div class="col-4 items-center justify-center flex">
      <user-photo :photo="user.profile_photo" :size="80" />
    </div>
    <div class="col justify-center user-details">
      <span class="user-name">{{ fullName }}</span>
      <span class="birthday">
        <q-icon name="fa-solid fa-cake-candles"></q-icon>
        {{ birthdayDate }}
      </span>
      <span class="user-email">
        <q-icon name="fa-solid fa-envelope" />
        {{ user.email }}
      </span>
    </div>
    <div class="user-actions">
      <q-icon name="fa-solid fa-eye" @click="$emit('open-settings', user)">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          style="font-size: 13px"
        >
          Detalhes
        </q-tooltip>
      </q-icon>
      <q-icon name="fa-solid fa-pencil" @click="$emit('edit', user)">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          style="font-size: 13px"
        >
          Alterar Dados
        </q-tooltip>
      </q-icon>
      <q-icon name="fa-solid fa-trash" @click="$emit('delete', user)">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          style="font-size: 13px"
        >
          Remover
        </q-tooltip>
      </q-icon>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import UserPhoto from '@/components/patient/photo.vue'

import type User from '@/types/User'
import type PersonalData from '@/types/PersonalData'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    personalData: {
      type: Object as PropType<PersonalData>,
      required: false,
    },
  },
  components: {
    UserPhoto,
  },
  data() {
    return {
      search: '',
      isLoading: false,
    }
  },
  computed: {
    birthdayDate() {
      if (!this.personalData) {
        return '--/--/---- (--)'
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
  top: 50%;
  transform: translateY(-50%);
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
