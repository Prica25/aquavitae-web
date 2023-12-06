<template>
  <base-page
    title="Dados Bioquímicos"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #right-header>
      <q-icon
        name="fa-solid fa-pen"
        color="primary"
        size="18px"
        style="cursor: pointer; margin: 0 12px"
        @click="update"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          style="font-size: 13px"
        >
          Alterar
        </q-tooltip>
      </q-icon>
      <q-btn
        class="btn"
        color="primary"
        label="Adicionar Registo"
        @click="add"
        style="height: 56px; margin-left: 12px"
      />
    </template>
    <template #content>
      <div class="col-6" style="margin: 12px">
        <div class="row box-default" style="margin: 8px 0; padding: 12px">
          <div class="col text-center">
            <b>Data</b>
          </div>
          <q-separator vertical />
          <div class="col text-center">
            <div class="row justify-center" style="align-items: center">
              <q-icon
                :color="
                  pagination.page !== pagination.totalPages ? 'primary' : 'grey'
                "
                name="fa-solid fa-chevron-left"
                style="margin-right: 8px; cursor: pointer"
                @click="
                  pagination.page !== pagination.totalPages
                    ? prevData()
                    : undefined
                "
              />
              {{ formatedDate }}
              <q-icon
                :color="pagination.page !== 1 ? 'primary' : 'grey'"
                name="fa-solid fa-chevron-right"
                style="margin-left: 8px; cursor: pointer"
                @click="pagination.page !== 1 ? nextData() : undefined"
              />
            </div>
          </div>
        </div>
        <div
          v-for="param in biochemicalParams"
          :class="{ row: true, 'box-default': !param.spacer }"
          :style="
            param.spacer ? 'margin: 14px 0;' : 'margin: 8px 0; padding: 12px'
          "
        >
          <div v-if="!param.spacer" class="col text-center">
            <b>{{ param.label }}</b>
          </div>
          <q-separator v-if="!param.spacer" vertical />
          <div
            v-if="!param.spacer && param.formatter"
            class="col text-center"
            v-html="param.formatter(biochemicalData?.[0]) || '...'"
          />
          <div v-if="!param.spacer && !param.formatter" class="col text-center">
            {{ biochemicalData?.[param.value] || '...' }}
            <i>{{ param.unit ? param.unit : '' }}</i>
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import BiochemicalDataService from '@/services/BiochemicalDataService'

import type BiochemicalData from '@/types/BiochemicalData'

import { formatDate } from '@/utils'

export default defineComponent({
  props: {
    appointment_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      breadcrumbs: [] as any[],
      biochemicalData: null as BiochemicalData | null,
      biochemicalParams: [
        { spacer: true },
        { label: 'Proteínas totais', value: 'total_proteins', unit: 'g/L' },
        { label: 'Albumina', value: 'albumin', unit: 'g/L' },
        { label: 'Ureia', value: 'urea', unit: 'mg/dL' },
        { label: 'Ácido Úrico', value: 'uric_acid', unit: 'mg/dL' },
        { label: 'Creatinina', value: 'creatinine', unit: 'mg/dL' },
        {
          label: 'Colesterol Total',
          value: 'total_cholesterol',
          unit: 'mg/dL',
        },
        { label: 'HDL', value: 'hdl', unit: 'mg/dL' },
        { label: 'LDL', value: 'ldl', unit: 'mg/dL' },
        { label: 'Glicemia', value: 'glycemia', unit: 'mg/dL' },
        { label: 'HgA1C', value: 'hda1c', unit: '%' },
        { label: 'Glicemia jj', value: 'fasting_glycemia', unit: 'mg/dL' },
        {
          label: 'Glicemia pp',
          value: 'post_prandial_glycemia',
          unit: 'mg/dL',
        },
        { label: 'Bilirrubina total', value: 'total_bilirubin', unit: 'mg/dL' },
        {
          label: 'Bilirrubina directa',
          value: 'biliburin_direct',
          unit: 'mg/dL',
        },
        {
          label: 'Fosfatase alcalina',
          value: 'alkaline_phosphatase',
          unit: 'U/L',
        },
        { label: 'AST/TGO', value: 'ast_tgo', unit: 'U/L' },
        { label: 'ALT/TGP', value: 'alt_tgp', unit: 'U/L' },
        { label: 'γ-GT-', value: 'ygt', unit: 'U/L' },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 1,
        totalPages: 1,
      },
    }
  },
  async created() {},
  async mounted() {
    this.getData()
  },
  computed: {
    formatedDate() {
      if (this.biochemicalData) {
        return formatDate(this.biochemicalData.date, { showHour: false })
      }
      return '../../....'
    },
  },
  methods: {
    async getData() {
      const data = (
        await BiochemicalDataService.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          this.appointment_id,
          this.biochemicalParams
            .map((column) => (!column.estimated ? column.value : false))
            .filter((v: string | boolean) => !!v)
        )
      ).data
      console.log(data)
      this.biochemicalData = data.data?.[0] as BiochemicalData
      this.pagination.totalPages = data.count
    },
    prevData() {
      this.pagination.page++
      this.getData()
    },
    nextData() {
      this.pagination.page--
      this.getData()
    },
    add() {
      this.$router.push({
        name: 'biochemical-data-create-form',
        params: { appointment_id: this.appointment_id },
      })
    },
    update() {
      this.$router.push({
        name: 'biochemical-data-update-form',
        params: { id: this.biochemicalData.id },
      })
    },
  },
})
</script>
