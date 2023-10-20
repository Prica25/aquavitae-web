<template>
  <base-page
    title="Pacientes"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #right-header>
      <search
        v-model="search"
        @click-button="add"
        add-button
        button-text="Adicionar Paciente"
      ></search>
    </template>
    <template #content>
      <patient-box
        v-for="user in users"
        :user="user"
        :personal-data="user.personalData"
        @view="view"
        @edit="edit"
        @delete="delete"
        @open-settings="openSettings"
        style="margin: 16px"
      ></patient-box>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PatientBox from '@/components/patient/box.vue'

import type User from '@/types/User'
import type PersonalData from '@/types/PersonalData'

import UserService from '@/services/UserService'
import PersonalDataService from '@/services/PersonalDataService'

export default defineComponent({
  components: {
    PatientBox,
  },
  data() {
    return {
      search: '',
      users: [] as Array<User>,
      patientsData: [] as Array<PersonalData>,
      pagination: {
        sortBy: 'email',
        descending: false,
        page: 1,
        rowsPerPage: 8,
        pagesNumber: 0,
        rowsNumber: 0,
      },
    }
  },
  async mounted() {
    let users = (
      await UserService.index(
        this.pagination.page,
        this.pagination.rowsPerPage,
        `${this.pagination.sortBy}:${
          this.pagination.descending ? 'DESC' : 'ASC'
        }`
      )
    ).data.data

    const patientsData = (
      await PersonalDataService.show(users.map((u: User) => u.id) as string[])
    ).data

    for (let user of users) {
      user.personalData = patientsData.find(
        (pd: PersonalData) => pd.user.id === user.id
      )
    }

    this.users = users
  },
  methods: {
    add() {
      alert('add')
    },
    view(user: User) {
      alert('view')
    },
    edit(user: User) {
      alert('edit')
    },
    delete(user: User) {
      alert('delete')
    },
    openSettings(user: User) {
      this.$router.push({
        name: 'menu-user',
        params: { user_id: user.id },
      })
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
.header-table :deep(thead tr:first-child th) {
  background-color: #f5f7f9;
}

.q-pagination :deep(.q-btn-item.q-btn--flat) {
  margin: 0 2px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #646464 !important;
}
</style>
