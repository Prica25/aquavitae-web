<template>
  <base-page :title="title">
    <template v-slot:right-header>
      <search
        v-model="search"
        @click-button="add"
        :add-button="addButton"
        :button-text="addButtonText"
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
            :columns="columnsComputed"
            row-key="name"
            v-model:pagination="pagination"
            :filter="search"
            no-data-label="Sem dados"
            no-results-label="Sem resultados para a pesquisa"
            hide-pagination
            :loading="isLoading"
            @request="onRequest"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="column in (columns as QTableColumn[])"
                  :key="column.name"
                  :props="props"
                >
                  <slot :name="`column-${column.name}`">
                    {{
                      typeof column.field === 'function'
                        ? column.field(props.row)
                        : props.row[column.name]
                    }}
                  </slot>
                </q-td>
                <q-td v-if="!hideActionsColumn" key="actions" :props="props">
                  <q-icon
                    name="fa-solid fa-pencil"
                    color="secondary"
                    style="cursor: pointer; margin: 0 4px"
                    @click="edit(props.row.id)"
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
import type { QTableColumn } from 'quasar'

import Details from '@/components/food/details.vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    addButton: {
      type: Boolean,
      default: false,
    },
    addButtonText: {
      type: String,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    hideActionsColumn: {
      type: Boolean,
      default: false,
    },
    tableSortBy: {
      type: String,
      required: true,
    },
    filterColumn: {
      type: String,
      required: true,
    },
    createForm: {
      type: String,
    },
  },
  components: {
    Details,
  },
  data() {
    return {
      SERVICE: import(
        /* @vite-ignore */ `../../services/${this.type}Service.ts`
      ),
      search: '',
      rows: [] as any[],
      pagination: {
        sortBy: this.tableSortBy || (this.columns[0] as QTableColumn)?.name,
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
  async mounted() {
    this.SERVICE = (await this.SERVICE).default
    let response = (
      await this.SERVICE.index(
        this.pagination.page,
        this.pagination.rowsPerPage,
        `${this.pagination.sortBy}:${
          this.pagination.descending ? 'DESC' : 'ASC'
        }`,
        this.columns.map((c: any) => c.name)
      )
    ).data as ResponseList

    this.pagination.rowsNumber = response.count
    this.pagination.pagesNumber = response.last_page
    this.rows = response.data
    this.isLoading = false
  },
  computed: {
    columnsComputed() {
      return [].concat(
        this.columns,
        this.hideActionsColumn
          ? []
          : [
              {
                name: 'actions',
                align: 'right',
                label: 'Ações',
                field: 'actions',
                sortable: false,
              },
            ]
      )
    },
  },
  methods: {
    add() {
      this.$router.push({ name: this.createForm })
    },
    async remove(id: string) {
      try {
        const resultado = await this.$confirmation('delete')
        if (resultado) {
          await this.SERVICE.delete(id)
        }
        console.log(resultado)
      } catch (err) {
        console.log(err)
      }
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
        await this.SERVICE.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `${this.pagination.sortBy}:${
            this.pagination.descending ? 'DESC' : 'ASC'
          }`,
          this.columns.map((c: any) => c.name),
          filter ? `${this.filterColumn}:${filter}` : null
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
