<template>
  <base-page title="Tipos de Refeições">
    <template v-slot:right-header>
      <search
        v-model="search"
        @click-button="add"
        add-button
        button-text="Adicionar Tipo"
      ></search>
    </template>
    <template v-slot:content>
      <div
        class="items-center justify-center"
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
      >
        <q-card class="q-pa-xl table-card">
          <q-table
            ref="table"
            table-header-class="header-table"
            :rows="rows"
            :columns="columns"
            row-key="name"
            v-model:pagination="pagination"
            :filter="search"
            no-data-label="Sem dados"
            no-results-label="Sem resultados para a pesquisa"
            hide-pagination
            @request="onRequest"
            :loading="isLoading"
          ></q-table>
          <q-separator class="q-my-md" />
          <q-pagination
            v-model="pagination.page"
            @update:model-value="() => ($refs as any).table.requestServerInteraction()"
            color="primary"
            :max="pagination.pagesNumber"
            :max-pages="5"
            direction-links
          />
        </q-card>
      </div>
      <Details v-model="isDetailsVisible" :food="selectedFood" />
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type ResponseList from '@/types/ResponseList'
import FoodService from '@/services/FoodService'

import Details from '@/components/food/details.vue'

export default defineComponent({
  components: {
    Details,
  },
  data() {
    return {
      search: '',
      rows: [
        {
          description: 'Pequeno-Almoço',
          lipids_percentage: 30,
          proteins_percentage: 15,
          carbohydrates_percentage: 55,
        },
        {
          description: 'Almoço',
          lipids_percentage: 35,
          proteins_percentage: 15,
          carbohydrates_percentage: 50,
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
          name: 'lipids_percentage',
          label: 'Lípidos (%)',
          field: 'lipids_percentage',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'proteins_percentage',
          label: 'Proteína (%)',
          field: 'proteins_percentage',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'carbohydrates_percentage',
          label: 'Hidratos Carbono (%)',
          field: 'carbohydrates_percentage',
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
      pagination: {
        sortBy: 'description',
        descending: false,
        page: 1,
        rowsPerPage: 8,
        pagesNumber: 0,
        rowsNumber: 0,
      },
      isLoading: false,
      isDetailsVisible: false,
      selectedFood: '',
    }
  },
  async mounted() {},
  methods: {
    add() {
      this.$router.push({ name: 'type-meals-create-form' })
    },
    remove(id: string) {
      this.selectedFood = id
      console.log('remove food', id)
    },
    view(id: string) {
      this.selectedFood = id
      this.isDetailsVisible = true
    },
    edit(id: string) {
      this.selectedFood = id
      console.log('edit food', id)
    },
    async onRequest(props: any) {
      this.isLoading = true
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      let response = (
        await FoodService.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `${this.pagination.sortBy}:${
            this.pagination.descending ? 'DESC' : 'ASC'
          }`,
          ['description', 'food_category'],
          filter ? `description:${filter}` : null
        )
      ).data as ResponseList

      this.pagination.rowsNumber = response.count
      this.pagination.pagesNumber = response.last_page
      this.rows = response.data

      this.isLoading = false

      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending
    },
  },
})
</script>
<style scoped>
:deep(.header-table) {
  background: var(--q-primary);
  color: white;
}
</style>
