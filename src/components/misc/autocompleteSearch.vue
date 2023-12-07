<template>
  <q-select
    dense
    outlined
    v-model="value"
    :options="options"
    :loading="isLoading"
    @virtual-scroll="onScroll"
    :label="label"
    :option-value="valueKey"
    :option-label="labelKey"
    :emit-value="!returnObject"
    map-options
    :use-input="!value"
    @filter="onFilter"
    hide-bottom-space
  >
    <template v-slot:selected-item="scope">
      <span class="ellipsis">{{ scope.opt[labelKey] }}</span>
    </template>
    <template v-if="clearable && value" v-slot:append>
      <q-icon
        name="fa-solid fa-xmark"
        @click="value = null"
        class="cursor-pointer"
        style="font-size: 16px"
      />
    </template>
  </q-select>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type ResponseList from '@/types/ResponseList'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    valueKey: {
      type: String,
    },
    labelKey: {
      type: String,
      default: false,
    },
    label: {
      type: String,
      default: 'Procurar...',
    },
    defaultFilter: {
      type: String,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      SERVICE: import(
        /* @vite-ignore */ `../../services/${this.type}Service.ts`
      ) as any,
      options: [] as any,
      pagination: {
        sortBy: this.labelKey,
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
    this.SERVICE = (await this.SERVICE).default

    let response = (
      await this.SERVICE.index(
        this.pagination.page,
        1,
        `${this.pagination.sortBy}:${
          this.pagination.descending ? 'DESC' : 'ASC'
        }`,
        this.labelKey,
        this.filters
      )
    ).data as ResponseList

    this.pagination.rowsNumber = response.count
    this.pagination.pagesNumber = response.last_page
    this.options = Object.freeze(response.data)
    if (this.modelValue && typeof this.modelValue === 'string') {
      this.options = [
        ...this.options,
        (await this.SERVICE.show(this.modelValue)).data,
      ]
    }
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
    filters() {
      const fil = [
        this.defaultFilter,
        this.filter ? `${this.labelKey}:${this.filter}` : null,
      ].filter((value) => !!value)

      if (fil.length > 0) {
        if (fil.length === 1) {
          return fil[0]
        }
        return fil
      }
      return null
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
          await this.SERVICE.index(
            this.pagination.page,
            this.pagination.rowsPerPage,
            `${this.pagination.sortBy}:${
              this.pagination.descending ? 'DESC' : 'ASC'
            }`,
            this.labelKey,
            this.filters
          )
        ).data as ResponseList

        this.options = Object.freeze([...this.options, ...response.data])
        this.isLoading = false
      }
    },
    async onFilter(str: string, update: (fnc: () => void) => void) {
      this.isLoading = true
      this.filter = str
      let response = (
        await this.SERVICE.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `${this.pagination.sortBy}:${
            this.pagination.descending ? 'DESC' : 'ASC'
          }`,
          this.labelKey,
          this.filters
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
