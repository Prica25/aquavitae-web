<template>
  <base-page title="Receitas">
    <template #right-header>
      <q-btn
        outline
        round
        color="negative"
        icon="fa-solid fa-xmark"
        @click="goBack"
      />
    </template>
    <template #content>
      <q-form
        ref="form"
        @submit="save"
        class="items-center justify-center"
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
      >
        <div
          class="box-default q-pa-xl text-center form-card"
          style="min-width: 50vw"
        >
          <div class="row" style="width: 100%">
            <div class="col">
              <q-input
                outlined
                dense
                v-model="object.description"
                label="Descrição"
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo Obrigatório',
                ]"
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
                @change="formChanged = true"
                hide-bottom-space
              />
              <q-separator />
              <autocomplete
                v-model="canEatAt"
                @update:model-value="addCanEatAt"
                label="Adicionar Tipo de Refeição"
                type="TypeOfMeal"
                value-key="id"
                label-key="description"
                return-object
                multi
                :rules="[
                  () =>
                    (object.can_eat_at && object.can_eat_at.length > 0) ||
                    'Campo Obrigatório',
                ]"
              />
              <div class="can-eat-at-list">
                <div
                  v-for="can_eat_at in object.can_eat_at"
                  class="row box-default"
                >
                  <span>{{ can_eat_at.description }}</span>
                  <q-space />
                  <q-icon
                    name="fa-solid fa-trash"
                    color="negative"
                    style="cursor: pointer; margin: 0 8px"
                    @click="removeCanEatAt(can_eat_at.id)"
                  />
                </div>
              </div>
            </div>
            <q-separator vertical style="margin: 0 12px" />
            <div class="col">
              <q-btn
                flat
                color="primary"
                icon="fa-solid fa-file-circle-plus"
                label="Adicionar alimentos"
                @click="addFood"
              />
              <div
                class="row"
                v-for="food in object.foods"
                style="margin: 8px 0"
              >
                <autocomplete
                  v-model="food.food"
                  label="Alimento"
                  type="Food"
                  value-key="id"
                  label-key="description"
                  multi
                  :rules="[() => !!food.food || 'Campo Obrigatório']"
                  style="width: 300px"
                />
                <q-input
                  outlined
                  dense
                  v-model="food.amount_grams"
                  label="Quantidade"
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) || 'Campo Obrigatório',
                  ]"
                  autocorrect="off"
                  autocapitalize="off"
                  autocomplete="off"
                  spellcheck="false"
                  @change="formChanged = true"
                  hide-bottom-space
                  style="width: 75px; margin-left: 12px"
                />
              </div>
            </div>
          </div>

          <q-btn color="primary" label="Adicionar" type="submit" />
        </div>
      </q-form>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'

import ItemService from '@/services/ItemService'
import TypeOfMealService from '@/services/TypeOfMealService'

export default defineComponent({
  components: {
    Autocomplete,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formChanged: false,
      canEatAt: null,
      object: {
        description: '',
        can_eat_at: [] as string[],
        foods: [] as any[],
      },
    }
  },
  async created() {
    const object = (await ItemService.show(this.id)).data

    this.object.description = object.description
    this.object.foods = object.foods.map((f) => ({
      food: f.food.id,
      amount_grams: f.amount_grams,
    }))
    let cea = []
    for (const canEatAt of object.can_eat_at) {
      cea.push((await TypeOfMealService.show(canEatAt.type_of_meal)).data)
    }
    this.object.can_eat_at = cea
    // this.object.can_eat_at = console.log(object)
  },
  methods: {
    addFood() {
      this.formChanged = true
      this.object.foods.push({ food: null, amount_grams: null })
    },
    addCanEatAt() {
      this.formChanged = true
      if (
        this.object.can_eat_at.findIndex(
          (value) => value.id === this.canEatAt.id
        ) === -1
      ) {
        this.object.can_eat_at.push(this.canEatAt)
      }
      this.canEatAt = null
    },
    removeCanEatAt(id: string) {
      const index = this.object.can_eat_at.findIndex((value) => value.id === id)
      this.object.can_eat_at.splice(index, 1)
    },
    async goBack() {
      if (!this.formChanged || (await this.$confirmation('cancel'))) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        try {
          await ItemService.put(this.id, {
            ...this.object,
            can_eat_at: this.object.can_eat_at.map((value) => value.id),
          })
          this.$router.back()
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
})
</script>
<style scoped>
.form-card {
  width: 35vw;
  min-width: 500px;
}
.mg > *:not(.can-eat-at-list *) {
  margin: 10px 10px 0 10px;
}
.form-card > .q-btn {
  margin-top: 25px;
}
.can-eat-at-list {
  flex: 1 1 auto;
  border-radius: 4px;
  overflow-y: scroll;
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.24);
  max-height: 215px;
  min-height: 100px;
}
.can-eat-at-list * {
  margin: 8px;
  font-size: 12px;
}
</style>
