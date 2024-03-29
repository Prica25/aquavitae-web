<template>
  <base-page
    :title="title"
    horizontal-alignment="center"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs ? breadcrumbs : undefined"
  >
    <template #right-header>
      <search
        v-model="filter"
        @click-button="add"
        :add-button="addButton"
        :button-text="addButtonText"
      ></search>
    </template>
    <template #content>
      <div style="width: 100%">
        <custom-table
          ref="table"
          v-model:pagination="pagination"
          v-model:sort="sort"
          :rows="rows"
          :columns="columnsComputed"
          :loading="isLoading"
          @request="requestDB"
          :disableTooltip="disableTooltip"
        >
          <template #actions="{ row }">
            <span>
              <slot name="custom-actions" v-bind="{ row }"></slot>
              <q-icon
                name="fa-solid fa-pencil"
                color="secondary"
                style="cursor: pointer; margin: 0 4px"
                @click="edit(row.id)"
              />
              <q-icon
                name="fa-solid fa-trash"
                color="negative"
                style="cursor: pointer; margin: 0 4px"
                @click="remove(row.id)"
              />
            </span>
          </template>
        </custom-table>
        <!-- <Details v-model="isDetailsVisible" :food="selectedFood" /> -->
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type ResponseList from '@/types/ResponseList'

import Details from '@/components/food/details.vue'
import CustomTable from '@/components/misc/CustomTable.vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    createForm: {
      type: String,
    },
    updateForm: {
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

    dbColumns: {
      type: Array,
    },
    disableTooltip: {
      type: Boolean,
      default: false,
    },
    defaultFilter: {
      type: String,
    },
    breadcrumbs: {
      type: [Array, Boolean],
      default: false,
    },
  },
  components: {
    CustomTable,
    Details,
  },
  data() {
    return {
      SERVICE: import(
        /* @vite-ignore */ `../../services/${this.type}Service.ts`
      ) as any,
      filter: '',
      rows: [] as any[],
      sort: {
        by: this.tableSortBy || (this.columns[0] as any)?.name,
        descending: false,
      },
      pagination: {
        page: 1,
        rowsPerPage: 8,
        pagesNumber: 0,
        rowsNumber: 0,
      },
      isLoading: true,
      isDetailsVisible: false,
      selectedFood: '',
    }
  },
  async mounted() {
    this.SERVICE = (await this.SERVICE).default
    this.requestDB()
  },
  computed: {
    columnsComputed() {
      return [
        ...this.columns,
        {
          name: 'actions',
          align: 'right',
          label: 'Ações',
          field: 'actions',
          sortable: false,
        },
      ]
    },
  },
  watch: {
    filter() {
      this.requestDB()
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
          const index = this.rows.findIndex((r: any) => r.id === id)
          if (index !== -1) {
            this.rows.splice(index, 1)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    edit(id: string) {
      this.$router.push({
        name: this.updateForm,
        params: { id },
      })
    },
    async requestDB() {
      this.isLoading = true

      let response = (
        await this.SERVICE.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `${this.sort.by}:${this.sort.descending ? 'DESC' : 'ASC'}`,
          this.dbColumns
            ? this.dbColumns
            : this.columns.map((c: any) => c.name),
          [
            this.defaultFilter,
            this.filter ? `${this.filterColumn}:${this.filter}` : null,
          ].filter((v) => !!v)
        )
      ).data as ResponseList

      this.pagination.rowsNumber = response.count
      this.pagination.pagesNumber = response.last_page
      this.rows = response.data

      setTimeout(() => {
        this.isLoading = false
      }, 100)
    },
  },
})
</script>
<style scoped>
.table-card {
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>
