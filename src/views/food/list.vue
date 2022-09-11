<template>
  <base-page title="Alimentos">
    <template v-slot:right-header>
      <search
        v-model="search"
        @click-button="add"
        add-button
        button-text="Adicionar Alimento"
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
          />
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
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type ResponseList from '@/types/ResponseList'
import FoodService from '@/services/FoodService'

export default defineComponent({
  data() {
    return {
      search: '',
      rows: [] as any[],
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
          name: 'energy_value',
          label: 'Energia (kcal)',
          field: 'energy_value',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'level_1',
          label: 'Nível 1',
          field: (row: any) => row.food_category.description,
          align: 'left',
          style: 'max-width: 20vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'max-width: 20vw',
          sortable: true,
        },
        {
          name: 'level_2',
          label: 'Nível 2',
          field: (row: any) => row.food_category.food_category.description,
          align: 'left',
          style: 'max-width: 20vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'max-width: 20vw',
          sortable: true,
        },
        {
          name: 'level_3',
          label: 'Nível 3',
          field: (row: any) =>
            row.food_category.food_category.food_category?.description || '---',
          align: 'left',
          style: 'max-width: 20vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'max-width: 20vw',
          sortable: true,
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
    }
  },
  async mounted() {
    let response = (
      await FoodService.index(
        this.pagination.page,
        this.pagination.rowsPerPage,
        `${this.pagination.sortBy}:${
          this.pagination.descending ? 'DESC' : 'ASC'
        }`
      )
    ).data as ResponseList

    this.pagination.rowsNumber = response.count
    this.pagination.pagesNumber = response.last_page
    this.rows = response.data
  },
  methods: {
    add() {
      console.log('add new food')
    },
    onRequest(props: any) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      if (filter) {
        console.log('with filter')
      } else {
        console.log('------')
      }

      // this.pagination.rowsNumber = getRowsNumberCount(filter)
      // // calculate starting row of data
      // const startRow = (page - 1) * rowsPerPage

      // // fetch data from "server"
      // const returnedData = fetchFromServer(
      //   startRow,
      //   rowsPerPage,
      //   filter,
      //   sortBy,
      //   descending
      // )

      // // clear out existing data and add new
      // rows.value.splice(0, rows.value.length, ...returnedData)

      // don't forget to update local pagination object
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

.q-pagination :deep(.q-btn-item.q-btn--flat) {
  margin: 0 2px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #646464 !important;
}

.table-card {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.table-card .q-separator {
  width: 100%;
}
</style>
