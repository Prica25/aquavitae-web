<template>
  <div class="row q-ma-0" style="width: 100%">
    <div class="col data-card box-default">
      <div class="title">Proteínas</div>
      <div class="bottom">
        <div class="details">
          <span
            v-if="actualProteins.totalMin !== actualProteins.totalMax"
            class="small"
          >
            ({{ format(actualProteins.totalMin) || '0' }})
          </span>
          <span>{{ format(actualProteins.totalMax) || '0' }}</span>
          <span>/{{ format(totalProteins) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              proteinsDiff.max
                ? proteinsDiff.max > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ format(proteinsDiff.max) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Lípidos</div>
      <div class="bottom">
        <div class="details">
          <span
            v-if="actualLipids.totalMin !== actualLipids.totalMax"
            class="small"
          >
            ({{ format(actualLipids.totalMin) || '0' }})
          </span>
          <span>{{ format(actualLipids.totalMax) || '0' }}</span>
          <span>/{{ format(totalLipids) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              lipidsDiff.max
                ? lipidsDiff.max > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ format(lipidsDiff.max) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Hidratos de Carbono</div>
      <div class="bottom">
        <div class="details">
          <span
            v-if="actualCarbohydrates.totalMin !== actualCarbohydrates.totalMax"
            class="small"
          >
            ({{ format(actualCarbohydrates.totalMin) || '0' }})
          </span>
          <span>{{ format(actualCarbohydrates.totalMax) || '0' }}</span>
          <span>/{{ format(totalCarbohydrates) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              carbohydratesDiff.max
                ? carbohydratesDiff.max > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ format(carbohydratesDiff.max) || 'Sem dados Antropométricos' }}
        </div>
      </div>
    </div>
    <div class="col data-card box-default">
      <div class="title">Valor Energético</div>
      <div class="bottom">
        <div class="details">
          <span
            v-if="actualEnergyValue.totalMin !== actualEnergyValue.totalMax"
            class="small"
          >
            ({{ format(actualEnergyValue.totalMin) || '0' }})
          </span>
          <span>{{ format(actualEnergyValue.totalMax) || '0' }}</span>
          <span>/{{ format(totalEnergyValue) || '0' }}</span>
        </div>
        <div class="info">
          <q-icon
            :name="`fa-solid fa-${
              energyValueDiff.max
                ? energyValueDiff.max > 0
                  ? 'arrow-up'
                  : 'arrow-down'
                : 'triangle-exclamation'
            }`"
            color="negative"
            size="14px"
            style="margin-right: 2px"
          />
          {{ format(energyValueDiff.max) || 'Sem dados Antropométricos' }}
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
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    anthropometricData: {
      type: Object as PropType<AnthropometricData>,
      required: true,
    },
    personalData: {
      type: Object as PropType<PersonalData>,
      required: true,
    },
    meals: {
      type: Array,
      required: true,
    },
  },
  computed: {
    actualEnergyValue(): any {
      return this.calculateMaxMin('energy_value')
    },
    actualProteins(): any {
      return this.calculateMaxMin('proteins')
    },
    actualLipids(): any {
      return this.calculateMaxMin('lipids')
    },
    actualCarbohydrates(): any {
      return this.calculateMaxMin('carbohydrates')
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
      const value = this.referenceWeight
        ? this.referenceWeight * this.personalData.activity_level.factor
        : 0

      return value
    },
    totalProteins(): number {
      const value = this.totalEnergyValue
        ? (this.totalEnergyValue * 0.2) / 4
        : 0
      return value
    },
    totalLipids(): number {
      const value = this.totalEnergyValue
        ? (this.totalEnergyValue * 0.3) / 9
        : 0
      return value
    },
    totalCarbohydrates(): number {
      const value = this.totalEnergyValue
        ? (this.totalEnergyValue * 0.5) / 4
        : 0
      return value
    },
    energyValueDiff(): any {
      return this.totalEnergyValue
        ? {
            max: this.totalEnergyValue - this.actualEnergyValue.totalMax,
            min: this.totalEnergyValue - this.actualEnergyValue.totalMin,
          }
        : { max: 0, min: 0 }
    },
    proteinsDiff(): any {
      return this.totalProteins
        ? {
            max: this.totalProteins - this.actualProteins.totalMax,
            min: this.totalProteins - this.actualProteins.totalMin,
          }
        : { max: 0, min: 0 }
    },
    lipidsDiff(): any {
      return this.totalLipids
        ? {
            max: this.totalLipids - this.actualLipids.totalMax,
            min: this.totalLipids - this.actualLipids.totalMin,
          }
        : { max: 0, min: 0 }
    },
    carbohydratesDiff(): any {
      return this.totalCarbohydrates
        ? {
            max: this.totalCarbohydrates - this.actualCarbohydrates.totalMax,
            min: this.totalCarbohydrates - this.actualCarbohydrates.totalMin,
          }
        : { max: 0, min: 0 }
    },
    limits: {
      get() {
        return this.modelValue
      },
      set(value: any) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    format(value: number) {
      return value ? Math.round(value) : null
    },
    calculateMaxMin(key: string) {
      let totalMax = 0
      let totalMin = 0

      this.meals.forEach((meal: any) => {
        const sums = meal.mealsOptions.map((option: any) => {
          const sum = option.foods.reduce((pv: number, food: any) => {
            const multipliedAmount = (food.amount_grams * option.amount) / 100
            return pv + food.food[key] * multipliedAmount
          }, 0)
          return sum
        })

        const max = sums.length > 0 ? Math.max(...sums) : 0
        const min = sums.length > 0 ? Math.min(...sums) : 0

        totalMax += max
        totalMin += min
      })

      return { totalMax, totalMin }
    },
  },
  watch: {
    anthropometricData() {
      this.limits = {
        calories_limit: Math.round(this.totalEnergyValue),
        proteins_limit: Math.round(this.totalProteins),
        lipids_limit: Math.round(this.totalLipids),
        carbohydrates_limit: Math.round(this.totalCarbohydrates),
      }
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

.data-card .details span {
  font-size: 25px;
  color: #b9b9b9;
  font-weight: bold;
}

.data-card .details span:last-child {
  font-size: 25px;
  color: #646464;
  font-weight: bold;
}

.data-card .details .small {
  font-size: 16px;
}

.data-card .info {
  color: var(--q-negative);
  font-weight: bold;
}
</style>
