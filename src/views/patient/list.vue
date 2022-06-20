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
          @delete="del"
          style="margin: 16px"
        ></patient-box>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PatientBox from '@/components/patient/box.vue'

export default defineComponent({
  components: {
    PatientBox,
  },
  data() {
    return {
      search: '',
      users: [
        {
          first_name: 'Gabriel',
          last_name: 'Pereira',
          birthday: '1982-01-01',
          email: 'gpereira@dev.pt',
        },
        {
          first_name: 'Francisco',
          last_name: 'Castro',
          birthday: '1981-01-01',
          email: 'fcastro@dev.pt',
        },
        {
          first_name: 'Daniel',
          last_name: 'Peixoto',
          birthday: '1981-01-01',
          email: 'dpeixoto@dev.pt',
        },
        {
          first_name: 'Rafaela',
          last_name: 'Santos',
          birthday: '1981-01-01',
          email: 'rsantos@dev.pt',
        },
        {
          first_name: 'Pedro Henrique',
          last_name: 'Costa',
          birthday: '1981-01-01',
          email: 'p.h.costa@dev.pt',
        },
        {
          first_name: 'Ana Luísa',
          last_name: 'Pires',
          birthday: '1981-01-01',
          email: 'ana.l.pires@dev.pt',
        },

        {
          first_name: 'Gabriel',
          last_name: 'Pereira',
          birthday: '1982-01-01',
          email: 'gpereira@dev.pt',
        },
        {
          first_name: 'Francisco',
          last_name: 'Castro',
          birthday: '1981-01-01',
          email: 'fcastro@dev.pt',
        },
        {
          first_name: 'Daniel',
          last_name: 'Peixoto',
          birthday: '1981-01-01',
          email: 'dpeixoto@dev.pt',
        },
        {
          first_name: 'Rafaela',
          last_name: 'Santos',
          birthday: '1981-01-01',
          email: 'rsantos@dev.pt',
        },
        {
          first_name: 'Daniel',
          last_name: 'Peixoto',
          birthday: '1981-01-01',
          email: 'dpeixoto@dev.pt',
        },
        {
          first_name: 'Rafaela',
          last_name: 'Santos',
          birthday: '1981-01-01',
          email: 'rsantos@dev.pt',
        },
        {
          first_name: 'Pedro Henrique',
          last_name: 'Costa',
          birthday: '1981-01-01',
          email: 'p.h.costa@dev.pt',
        },
        {
          first_name: 'Ana Luísa',
          last_name: 'Pires',
          birthday: '1981-01-01',
          email: 'ana.l.pires@dev.pt',
        },

        {
          first_name: 'Gabriel',
          last_name: 'Pereira',
          birthday: '1982-01-01',
          email: 'gpereira@dev.pt',
        },
        {
          first_name: 'Francisco',
          last_name: 'Castro',
          birthday: '1981-01-01',
          email: 'fcastro@dev.pt',
        },
      ],
    }
  },
  methods: {
    add() {
      alert('add')
    },
    view(user: Object) {
      alert('view')
    },
    edit(user: Object) {
      alert('edit')
    },
    del(user: Object) {
      alert('delete')
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
