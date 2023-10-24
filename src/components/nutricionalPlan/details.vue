<template>
  <div class="row q-ma-0" style="width: 100%">
    <div class="col data-card box-default">
      <div class="title">Proteínas</div>
      <div class="bottom">
        <div class="details">
          <span>{{ formatNumber(actualProteins) || '0' }}</span>
          <span>/{{ formatNumber(totalProteins) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              proteinsDiff
                ? proteinsDiff > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ formatNumber(proteinsDiff) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Lípidos</div>
      <div class="bottom">
        <div class="details">
          <span>{{ formatNumber(actualLipids) || '0' }}</span>
          <span>/{{ formatNumber(totalLipids) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              lipidsDiff
                ? lipidsDiff > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ formatNumber(lipidsDiff) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Hidratos de Carbono</div>
      <div class="bottom">
        <div class="details">
          <span>{{ formatNumber(actualCarbohydrates) || '0' }}</span>
          <span>/{{ formatNumber(totalCarbohydrates) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              carbohydratesDiff
                ? carbohydratesDiff > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ formatNumber(carbohydratesDiff) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Valor Energético</div>
      <div class="bottom">
        <div class="details">
          <span>{{ formatNumber(actualEnergyValue) || '0' }}</span>
          <span>/{{ formatNumber(totalEnergyValue) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              energyValueDiff
                ? energyValueDiff > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ formatNumber(energyValueDiff) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import type AnthropometricData from '@/types/AnthropometricData'
import type PersonalData from '@/types/PersonalData'

export default defineComponent({
  props: {
    anthropometricData: {
      type: Object as PropType<AnthropometricData>,
      required: true,
    },
    personalData: {
      type: Object as PropType<PersonalData>,
      required: true,
    },
    foodList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    actualEnergyValue(): number {
      return this.foodList.reduce((pv: number, cv: any) => {
        pv += (cv.food.energy_value * cv.amount_grams) / 100
        return pv
      }, 0)
    },
    actualProteins(): number {
      return this.foodList.reduce((pv: number, cv: any) => {
        pv += (cv.food.proteins * cv.amount_grams) / 100
        return pv
      }, 0)
    },
    actualLipids(): number {
      return this.foodList.reduce((pv: number, cv: any) => {
        pv += (cv.food.proteins * cv.amount_grams) / 100
        return pv
      }, 0)
    },
    actualCarbohydrates(): number {
      return this.foodList.reduce((pv: number, cv: any) => {
        pv += (cv.food.proteins * cv.amount_grams) / 100
        return pv
      }, 0)
    },
    referenceWeight(): number {
      if (
        this.personalData &&
        this.anthropometricData.height &&
        this.personalData.birthday
      ) {
        const height = this.anthropometricData.height
        const date = new Date(this.personalData.birthday)
        const today = new Date()

        let age = today.getFullYear() - date.getFullYear()
        const m = today.getMonth() - date.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--
        }

        const maleWeight =
          (50 + 0.75 * (height - 150) + 0.8 * (height - 100 + age / 2)) / 2

        if (this.personalData.gender === 'FEMALE') {
          return maleWeight * 0.95
        }
        return maleWeight
      }
      return 0
    },
    totalEnergyValue(): number {
      return this.referenceWeight
        ? Math.round(
            this.referenceWeight * this.personalData.activity_level.factor
          )
        : 0
    },
    totalProteins(): number {
      return this.totalEnergyValue ? (this.totalEnergyValue * 0.2) / 4 : 0
    },
    totalLipids(): number {
      return this.totalEnergyValue ? (this.totalEnergyValue * 0.3) / 9 : 0
    },
    totalCarbohydrates(): number {
      return this.totalEnergyValue ? (this.totalEnergyValue * 0.5) / 4 : 0
    },
    energyValueDiff(): number {
      return this.totalEnergyValue
        ? this.totalEnergyValue - this.actualEnergyValue
        : 0
    },
    proteinsDiff(): number {
      return this.totalProteins ? this.totalProteins - this.actualProteins : 0
    },
    lipidsDiff(): number {
      return this.totalLipids ? this.totalLipids - this.actualLipids : 0
    },
    carbohydratesDiff(): number {
      return this.totalCarbohydrates
        ? this.totalCarbohydrates - this.actualCarbohydrates
        : 0
    },
  },
  methods: {
    formatNumber(numb: number) {
      return numb ? Math.round(numb) : null
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
