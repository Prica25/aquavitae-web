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
          @view="view"
          @edit="edit"
          @delete="delete"
          @open-nutrition-plan="openNutritionPlan"
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

export default defineComponent({
  components: {
    PatientBox,
  },
  data() {
    return {
      search: '',
      users: [
        {
          id: 'd4d4e990-f076-4d9a-9d4d-cf00f100c8c4',
          first_name: 'Gabriel',
          last_name: 'Pereira',
          birthday: '1982-01-01',
          email: 'gpereira@dev.pt',
        },
        {
          id: 'e1d7c326-740e-444e-b18c-d90797067953',
          first_name: 'Francisco',
          last_name: 'Castro',
          birthday: '1981-01-01',
          email: 'fcastro@dev.pt',
        },
        {
          id: 'fb0f6b95-a134-4206-a992-f702a8a34105',
          first_name: 'Daniel',
          last_name: 'Peixoto',
          birthday: '1981-01-01',
          email: 'dpeixoto@dev.pt',
        },
        {
          id: '79356b0c-c7b1-47f8-838e-02a331280133',
          first_name: 'Rafaela',
          last_name: 'Santos',
          birthday: '1981-01-01',
          email: 'rsantos@dev.pt',
        },
        {
          id: 'fa56dc9d-e253-47fe-9778-0271ce3a64d8',
          first_name: 'Pedro Henrique',
          last_name: 'Costa',
          birthday: '1981-01-01',
          email: 'p.h.costa@dev.pt',
        },
        {
          id: 'f4419734-2749-4f75-8839-159d23371ed8',
          first_name: 'Ana Luísa',
          last_name: 'Pires',
          birthday: '1981-01-01',
          email: 'ana.l.pires@dev.pt',
        },
      ] as any[],
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
    // this.users = (
    //   await UserService.index(
    //     this.pagination.page,
    //     this.pagination.rowsPerPage,
    //     `${this.pagination.sortBy}:${
    //       this.pagination.descending ? 'DESC' : 'ASC'
    //     }`
    //   )
    // ).data
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
    openNutritionPlan(user: User) {
      console.log({
        name: 'nutrition-plan',
        params: { user_id: user.id },
      })
      this.$router.push({
        name: 'nutrition-plan',
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
