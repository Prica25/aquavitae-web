<template>
  <div class="row q-ma-0">
    <div class="col data-card box-default">
      <div class="title">Proteínas</div>
      <div class="bottom">
        <div class="details">
          <span>80,0</span><span>/{{ formatNumber(totalProteins) }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-arrow-${proteinsDiff > 0 ? 'up' : 'down'}`"
            color="negative"
            size="14px"
          />
          {{ formatNumber(proteinsDiff) }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Lípidos</div>
      <div class="bottom">
        <div class="details">
          <span>55,4</span><span>/{{ formatNumber(totalLipids) }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-arrow-${lipidsDiff > 0 ? 'up' : 'down'}`"
            color="negative"
            size="14px"
          />
          {{ formatNumber(lipidsDiff) }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Hidratos de Carbono</div>
      <div class="bottom">
        <div class="details">
          <span>277,0</span><span>/{{ formatNumber(totalCarbohydrates) }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-arrow-${carbohydratesDiff > 0 ? 'up' : 'down'}`"
            color="negative"
            size="14px"
          />
          {{ formatNumber(carbohydratesDiff) }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Valor Energético</div>
      <div class="bottom">
        <div class="details">
          <span>1665</span><span>/{{ totalEnergyValue }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-arrow-${energyValueDiff > 0 ? 'up' : 'down'}`"
            color="negative"
            size="14px"
          />
          {{ energyValueDiff }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import type AnthropometricData from '@/types/AnthropometricData'

export default defineComponent({
  props: {
    anthropometricData: {
      type: Object as PropType<AnthropometricData>,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    totalEnergyValue() {
      return Math.round(this.anthropometricData.weight * 32.5)
    },
    energyValueDiff() {
      return this.totalEnergyValue - 1665
    },
    totalProteins() {
      return (this.totalEnergyValue * 0.2) / 4
    },
    proteinsDiff() {
      return this.totalProteins - 80
    },
    totalLipids() {
      return (this.totalEnergyValue * 0.3) / 9
    },
    lipidsDiff() {
      return this.totalLipids - 55.4
    },
    totalCarbohydrates() {
      return (this.totalEnergyValue * 0.5) / 4
    },
    carbohydratesDiff() {
      return this.totalCarbohydrates - 277
    },
  },
  methods: {
    formatNumber(numb: number) {
      return numb.toFixed(2).replace('.', ',')
    },
  },
})
</script>
<style scoped>
.data-card {
  background: white;
  margin: 0 15px;
  height: 125px;
  padding: 15px;
  position: relative;
}
.data-card:first-child {
  margin: 0;
  margin-right: 15px;
}

.data-card:last-child {
  margin: 0;
  margin-left: 15px;
}

.data-card .title {
  color: #646464;
  font-size: 15px;
}

.data-card .bottom {
  position: absolute;
  bottom: 15px;
}

.data-card .details span:first-child {
  font-size: 25px;
  color: #b9b9b9;
  font-weight: bold;
}
.data-card .details span:last-child {
  font-size: 25px;
  color: #646464;
  font-weight: bold;
}
.data-card .info {
  color: var(--q-negative);
  font-weight: bold;
}
</style>
