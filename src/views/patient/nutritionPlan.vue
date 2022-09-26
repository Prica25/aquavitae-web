<template>
  <base-page title="Plano Nutricional">
    <template v-slot:content>
      <div class="row q-ma-0">
        <div class="col data-card">
          <div class="title">Proteínas</div>
          <div class="bottom">
            <div class="details"><span>80,0</span><span>/107,0</span></div>
            <div class="info">
              <q-icon
                name="fa-solid fa-arrow-up"
                color="negative"
                size="14px"
              />
              27,0
            </div>
          </div>
        </div>
        <div class="col data-card">
          <div class="title">Lípidos</div>
          <div class="bottom">
            <div class="details"><span>55,4</span><span>/71,0</span></div>
            <div class="info">
              <q-icon
                name="fa-solid fa-arrow-up"
                color="negative"
                size="14px"
              />
              15,9
            </div>
          </div>
        </div>
        <div class="col data-card">
          <div class="title">Hidratos de Carbono</div>
          <div class="bottom">
            <div class="details"><span>277,0</span><span>/267,0</span></div>
            <div class="info">
              <q-icon
                name="fa-solid fa-arrow-down"
                color="negative"
                size="14px"
              />
              10,0
            </div>
          </div>
        </div>
        <div class="col data-card">
          <div class="title">Valor Energético</div>
          <div class="bottom">
            <div class="details"><span>1665</span><span>/2139</span></div>
            <div class="info">
              <q-icon
                name="fa-solid fa-arrow-up"
                color="negative"
                size="14px"
              />
              474
            </div>
          </div>
        </div>
      </div>
      <div class="row number-meals">
        <span>Refeições</span>
        <q-space />
        <q-select outlined v-model="model" :options="options" dense />
      </div>
      <q-card class="q-pa-xl meal-card">
        <div class="row meal">
          <span>Pequeno-Almoço</span>
          <q-icon
            name="fa-solid fa-pencil"
            color="primary"
            style="cursor: pointer; margin: 0 8px"
            @click="editNome()"
          />
          <q-space />
          <q-select
            outlined
            v-model="modelSearch"
            :options="[]"
            label="Procurar Alimento"
            dense
            style="min-width: 200px; max-width: 200px"
          />
        </div>

        <q-table
          ref="table"
          table-header-class="header-table"
          :rows="rows1"
          :columns="columns"
          no-data-label="Sem alimentos selecionados"
          hide-pagination
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="proteins" :props="props">
                {{ props.row.proteins }}
              </q-td>
              <q-td key="lipids" :props="props">
                {{ props.row.lipids }}
              </q-td>
              <q-td key="carbohydrates" :props="props">
                {{ props.row.carbohydrates }}
              </q-td>
              <q-td key="energy_value" :props="props">
                {{ props.row.energy_value }}
              </q-td>
              <q-td key="actions" :props="props">
                <q-icon
                  name="fa-solid fa-eye"
                  color="primary"
                  style="cursor: pointer; margin: 0 4px"
                  @click="view()"
                />
                <q-icon
                  name="fa-solid fa-trash"
                  color="negative"
                  style="cursor: pointer; margin: 0 4px"
                  @click="remove()"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>
      <q-card class="q-pa-xl meal-card">
        <div class="row meal">
          <span>Almoço</span>
          <q-icon
            name="fa-solid fa-pencil"
            color="primary"
            style="cursor: pointer; margin: 0 8px"
            @click="editNome()"
          />
          <q-space />
          <q-select
            outlined
            v-model="modelSearch2"
            :options="[]"
            label="Procurar Alimento"
            dense
            style="min-width: 200px; max-width: 200px"
          />
        </div>

        <q-table
          ref="table"
          table-header-class="header-table"
          :rows="[]"
          :columns="columns"
          no-data-label="Sem alimentos selecionados"
          hide-pagination
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="proteins" :props="props">
                {{ props.row.proteins }}
              </q-td>
              <q-td key="lipids" :props="props">
                {{ props.row.lipids }}
              </q-td>
              <q-td key="carbohydrates" :props="props">
                {{ props.row.carbohydrates }}
              </q-td>
              <q-td key="energy_value" :props="props">
                {{ props.row.energy_value }}
              </q-td>
              <q-td key="actions" :props="props">
                <q-icon
                  name="fa-solid fa-eye"
                  color="primary"
                  style="cursor: pointer; margin: 0 4px"
                  @click="view()"
                />
                <q-icon
                  name="fa-solid fa-trash"
                  color="negative"
                  style="cursor: pointer; margin: 0 4px"
                  @click="remove()"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      modelSearch: null as string | null,
      modelSearch2: null as string | null,
      model: '2 Refeições',
      options: [
        '1 Refeição',
        '2 Refeições',
        '3 Refeições',
        '4 Refeições',
        '5 Refeições',
      ],
      rows1: [
        {
          description: 'Iogurte meio gordo, natural',
          proteins: 4.2,
          lipids: 1.8,
          carbohydrates: 5.0,
          energy_value: 54,
        },
        {
          description: 'Pão de mistura de trigo e centeio',
          proteins: 9,
          lipids: 1.4,
          carbohydrates: 53.8,
          energy_value: 272,
        },
        {
          description: 'Sumo de laranja, 100%',
          proteins: 0.3,
          lipids: 0.1,
          carbohydrates: 9.5,
          energy_value: 41,
        },
      ],
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
          name: 'proteins',
          label: 'Proteína',
          field: 'proteins',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'lipids',
          label: 'Lípidos',
          field: 'lipids',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'carbohydrates',
          label: 'Hidratos de Carbono',
          field: 'carbohydrates',
          align: 'center',
          style: 'font-weight: bold;',
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
          name: 'actions',
          align: 'center',
          label: 'Ações',
          field: 'actions',
          sortable: false,
        },
      ],
    }
  },
  methods: {
    view() {
      alert('Mostrar dados do alimento')
    },
    remove() {
      alert('Remover alimento da lista')
    },
    editNome() {
      alert('Alterar nome da refeição')
    },
  },
})
</script>
<style scoped>
:deep(.header-table) {
  background: var(--q-primary);
  color: white;
}

.data-card {
  background: white;
  margin: 0 15px;
  height: 125px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
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

.number-meals {
  height: 60px;
  background: white;
  align-items: center;
  padding: 0 15px;
  margin: 20px 0;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
}

.number-meals > span {
  color: #646464;
  font-weight: bold;
  font-size: 16px;
}

.meal {
  align-items: center;
  margin-bottom: 20px;
}

.meal > span {
  color: #646464;
  font-weight: bold;
}

.meal-card {
  margin: 20px 0;
}
</style>
