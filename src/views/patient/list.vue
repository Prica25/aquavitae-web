<template>
  <base-page
    title="Pacientes"
    horizontal-alignment="center"
    vertical-alignment="center"
    direction="column"
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
      <div v-if="pagination.rowsNumber > 0" class="row justify-center">
        <patient-box
          v-for="user in users"
          :user="user"
          :personal-data="user.personalData"
          @edit="edit"
          @delete="remove"
          @open-menu="openMenu"
          style="margin: 16px"
        ></patient-box>
      </div>
      <div v-else class="row no-results box-default">
        <q-icon
          color="negative"
          name="fa-solid fa-triangle-exclamation"
          size="24px"
          style="margin-right: 4px"
        />
        Sem Resultados
      </div>
      <div class="row table-footer">
        <q-pagination
          v-model="pagination.page"
          @update:model-value="$emit('request')"
          color="primary"
          :max="pagination.pagesNumber"
          :max-pages="7"
          boundary-numbers
        />
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PatientBox from '@/components/patient/box.vue'

import type User from '@/types/User'
import type PersonalData from '@/types/PersonalData'
import type ResponseList from '@/types/ResponseList'

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
    this.requestDB()
  },
  watch: {
    search() {
      this.requestDB()
    },
  },
  methods: {
    async requestDB() {
      let response = (
        await UserService.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `${this.pagination.sortBy}:${
            this.pagination.descending ? 'DESC' : 'ASC'
          }`,
          ['email', 'profile_photo'],
          ['role:USER', this.search ? `email:${this.search}` : '']
        )
      ).data as ResponseList

      this.pagination.rowsNumber = response.count
      this.pagination.pagesNumber = response.last_page

      if (response.count > 0) {
        const patientsData = (
          await PersonalDataService.show(
            response.data.map((u: User) => u.id) as string[]
          )
        ).data

        for (let user of response.data) {
          user.personalData = patientsData.find(
            (pd: PersonalData) => (pd.user as User).id === user.id
          )
        }
      }

      this.users = response.data
    },
    add() {
      this.$router.push({ name: 'patient-create-form' })
    },
    edit(user: User) {
      alert('edit')
    },
    async remove(user: User) {
      try {
        const resultado = await this.$confirmation('delete')
        if (resultado) {
          await UserService.delete(user.id)
          const index = this.users.findIndex((r: User) => r.id === user.id)
          if (index !== -1) {
            this.users.splice(index, 1)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    openMenu(user: User) {
      this.$router.push({
        name: 'menu-user',
        params: { user_id: user.id },
      })
    },
  },
})
</script>
<style scoped>
.no-results {
  justify-content: center;
  width: 100%;
  padding: 12px;
}

.table-footer {
  width: 100%;
  justify-content: center;
  padding: 12px 0;
  margin: 12px 0;
}
</style>
