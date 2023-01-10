<template>
  <q-card class="q-pa-xl meal-card">
    <div class="row meal">
      <span v-if="!changeName">{{ name }}</span>
      <q-input v-else outlined v-model="name" dense />
      <q-icon
        :name="`fa-solid fa-${changeName ? 'check' : 'pencil'}`"
        color="primary"
        style="cursor: pointer; margin: 0 8px"
        @click="editName()"
      />
      <q-space />
      <FoodSearch v-model="food_id" @update:model-value="addFood" />
    </div>

    <q-table
      ref="table"
      table-header-class="header-table"
      :rows="foodList"
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
              @click="view(props.row.id)"
            />
            <q-icon
              name="fa-solid fa-trash"
              color="negative"
              style="cursor: pointer; margin: 0 4px"
              @click="remove(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import FoodSearch from './foodSearch.vue'
import FoodService from '@/services/FoodService'
import type Food from '@/types/Food'

export default defineComponent({
  components: {
    FoodSearch,
  },
  data() {
    return {
      name: 'Pequeno-Almoço',
      changeName: false,
      search: null as string | null,
      food_id: null as string | null,
      foodList: [] as Food[],
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
    async addFood(id: string): Promise<void> {
      const food = (await FoodService.show(id)).data as Food
      this.foodList = [...this.foodList, food]
      this.food_id = null
    },
    view(id: string): void {
      alert('Mostrar dados do alimento')
    },
    remove(id: string): void {
      this.foodList = this.foodList.filter((o) => o.id === id)
    },
    editName(): void {
      this.changeName = !this.changeName
    },
  },
  watch: {
    foodList: {
      handler() {
        this.$emit('update-meal', this.foodList)
      },
      deep: true,
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
