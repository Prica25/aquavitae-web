<template>
  <base-page title="Pacientes">
    <template v-slot:right-header>
      <search
        v-model="search"
        @click-button="add"
        add-button
        button-text="Adicionar Paciente"
      ></search>
    </template>
    <template v-slot:content>
      <div
        class="row items-start justify-center"
        style="width: 100%; padding: 20px"
      >
        <patient-box
          v-for="user in users"
          :user="user"
          :personal-data="getPersonalData(user.id)"
          @view="view"
          @edit="edit"
          @delete="delete"
          @open-settings="openSettings"
          style="margin: 16px"
        ></patient-box>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PatientBox from '@/components/patient/box.vue'
import type User from '@/types/User'

import UserService from '@/services/UserService'
import PersonalDataService from '@/services/PersonalDataService'

export default defineComponent({
  components: {
    PatientBox,
  },
  data() {
    return {
      search: '',
      users: [] as any[],
      patientsData: [] as any[],
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
    this.users = (
      await UserService.index(
        this.pagination.page,
        this.pagination.rowsPerPage,
        `${this.pagination.sortBy}:${
          this.pagination.descending ? 'DESC' : 'ASC'
        }`
      )
    ).data.data

    this.patientsData = (
      await PersonalDataService.show(this.users.map((u) => u.id) as string[])
    ).data
  },
  methods: {
    getPersonalData(user_id: string) {
      return this.patientsData.find((pd) => pd.user.id === user_id)
    },
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
        name: 'settings',
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
