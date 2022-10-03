<template>
  <q-card class="q-pa-xl meal-card">
    <div class="row meal">
      <span>Pequeno-Almoço</span>
      <q-icon
        name="fa-solid fa-pencil"
        color="primary"
        style="cursor: pointer; margin: 0 8px"
        @click="editNome()"
      />
      <q-space />
      <q-select
        outlined
        v-model="search"
        :options="[]"
        label="Procurar Alimento"
        dense
        style="min-width: 200px; max-width: 200px"
      />
    </div>

    <q-table
      ref="table"
      table-header-class="header-table"
      :rows="food"
      :columns="columns"
      no-data-label="Sem alimentos selecionados"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="proteins" :props="props">
            {{ props.row.proteins }}
          </q-td>
          <q-td key="lipids" :props="props">
            {{ props.row.lipids }}
          </q-td>
          <q-td key="carbohydrates" :props="props">
            {{ props.row.carbohydrates }}
          </q-td>
          <q-td key="energy_value" :props="props">
            {{ props.row.energy_value }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-icon
              name="fa-solid fa-eye"
              color="primary"
              style="cursor: pointer; margin: 0 4px"
              @click="view()"
            />
            <q-icon
              name="fa-solid fa-trash"
              color="negative"
              style="cursor: pointer; margin: 0 4px"
              @click="remove()"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      search: null as string | null,
      food: [
        {
          description: 'Iogurte meio gordo, natural',
          proteins: 4.2,
          lipids: 1.8,
          carbohydrates: 5.0,
          energy_value: 54,
        },
        {
          description: 'Pão de mistura de trigo e centeio',
          proteins: 9,
          lipids: 1.4,
          carbohydrates: 53.8,
          energy_value: 272,
        },
        {
          description: 'Sumo de laranja, 100%',
          proteins: 0.3,
          lipids: 0.1,
          carbohydrates: 9.5,
          energy_value: 41,
        },
      ],
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          align: 'left',
          style:
            'min-width: 10vw; max-width: 10vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'min-width: 10vw; max-width: 10vw',
          sortable: true,
        },
        {
          name: 'proteins',
          label: 'Proteína',
          field: 'proteins',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'lipids',
          label: 'Lípidos',
          field: 'lipids',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'carbohydrates',
          label: 'Hidratos de Carbono',
          field: 'carbohydrates',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'energy_value',
          label: 'Energia (kcal)',
          field: 'energy_value',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Ações',
          field: 'actions',
          sortable: false,
        },
      ],
    }
  },
  methods: {
    view() {
      alert('Mostrar dados do alimento')
    },
    remove() {
      alert('Remover alimento da lista')
    },
    editNome() {
      alert('Alterar nome da refeição')
    },
  },
})
</script>
<style scoped>
:deep(.header-table) {
  background: var(--q-primary);
  color: white;
}
.meal-card {
  margin: 20px 0;
}
.meal {
  align-items: center;
  margin-bottom: 20px;
}
.meal > span {
  color: #646464;
  font-weight: bold;
}
</style>
