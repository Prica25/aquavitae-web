<template>
  <q-select
    filled
    v-model="value"
    :options="options"
    :loading="isLoading"
    @virtual-scroll="onScroll"
    placeholder="Procurar alimento..."
    option-value="id"
    option-label="description"
    emit-value
    map-options
    use-input
    @filter="onFilter"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type ResponseList from '@/types/ResponseList'
import FoodService from '@/services/FoodService'

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      options: [] as any,
      pagination: {
        sortBy: 'description',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        pagesNumber: 0,
        rowsNumber: 0,
      },
      isLoading: true,
      filter: null as string | null,
    }
  },
  async mounted() {
    let response = (
      await FoodService.index(
        this.pagination.page,
        1,
        `${this.pagination.sortBy}:${
          this.pagination.descending ? 'DESC' : 'ASC'
        }`,
        'description'
      )
    ).data as ResponseList

    this.pagination.rowsNumber = response.count
    this.pagination.pagesNumber = response.last_page
    this.options = Object.freeze(response.data)
    this.isLoading = false
  },
  computed: {
    value: {
      get(): string {
        return this.modelValue
      },
      set(val: string): void {
        this.$emit('update:modelValue', val)
      },
    },
  },
  methods: {
    async onScroll(props: any) {
      if (
        !this.isLoading &&
        this.pagination.page < this.pagination.pagesNumber &&
        props.index >= this.options.length - 10
      ) {
        this.isLoading = true
        this.pagination.page++
        let response = (
          await FoodService.index(
            this.pagination.page,
            this.pagination.rowsPerPage,
            `${this.pagination.sortBy}:${
              this.pagination.descending ? 'DESC' : 'ASC'
            }`,
            'description',
            this.filter ? `description:${this.filter}` : null
          )
        ).data as ResponseList

        this.options = Object.freeze([...this.options, ...response.data])
        this.isLoading = false
        console.log('a')
      }
    },
    async onFilter(str: string, update: (fnc: () => void) => void) {
      this.isLoading = true
      this.filter = str
      let response = (
        await FoodService.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `${this.pagination.sortBy}:${
            this.pagination.descending ? 'DESC' : 'ASC'
          }`,
          'description',
          this.filter ? `description:${this.filter}` : null
        )
      ).data as ResponseList

      this.pagination.rowsNumber = response.count
      this.pagination.pagesNumber = response.last_page
      this.pagination.page = 1

      update(() => {
        this.options = Object.freeze(response.data)
      })
      this.isLoading = false
    },
  },
})
</script>
