<template>
  <div class="table-wrapper">
    <table>
      <tr
        :class="`row table-header ${tableHeaderClass ? tableHeaderClass : ''}`"
      >
        <th
          v-for="column in columns"
          class="col"
          :style="`text-align: ${column.align || 'left'}; ${
            column.size ? 'flex: ' + column.size : ''
          } ${column.headerStyle ? column.headerStyle : ''}`"
          @click="sortBy(column)"
        >
          {{ column.label }}
          <q-icon
            v-if="'sortable' in column ? column.sortable : true"
            v-show="sort.by === column.name"
            :color="sort.by === column.name ? 'primary' : 'grey-6'"
            :name="`fa-solid fa-arrow-${
              sort.by === column.name ? ['up', 'down'][+sort.descending] : 'up'
            }`"
          />
        </th>
        <th
          v-if="expandableRows"
          class="col"
          :style="`text-align: right; flex: 50px`"
        />
      </tr>
      <tr
        v-if="loading"
        v-for="index in pagination?.rowsPerPage || []"
        :class="{
          row: true,
          'box-default': !filled,
          'box-filled': filled,
        }"
        style="margin: 12px 0"
      >
        <td
          class="col"
          colspan="100"
          style="padding: 0; border-radius: inherit"
        >
          <q-skeleton
            animation="wave"
            height="45px"
            style="border-radius: inherit"
          />
        </td>
      </tr>
      <tr
        v-if="!loading"
        v-for="row in rows"
        :class="{
          row: true,
          'table-row': true,
          'box-default': !filled,
          'box-filled': filled,
        }"
        @click="toogleExpansion(row)"
      >
        <td
          v-for="column in columns"
          class="col"
          :style="`text-align: ${column.align || 'left'}; ${
            column.size ? 'flex: ' + column.size : ''
          } ${column.style ? column.style : ''}`"
          :title="
            disableTooltip
              ? undefined
              : typeof column.field === 'function'
              ? column.field(row)
              : row[column.name]
          "
        >
          <slot :name="column.name" :row="row">
            <component
              v-if="
                typeof column.field === 'function' &&
                typeof column.field(row) === 'object'
              "
              :is="column.field(row)"
            />
            <span
              v-else
              v-html="
                typeof column.field === 'function'
                  ? column.field(row)
                  : row[column.name]
              "
            >
            </span>
          </slot>
        </td>

        <td
          v-if="expandableRows"
          class="col"
          :style="`text-align: right; flex: 50px`"
        >
          <q-icon
            color="primary"
            :name="`fa-solid fa-chevron-${row.expanded ? 'up' : 'down'}`"
          />
        </td>
        <div v-if="row.expanded" style="width: 100%">
          <hr
            style="
              border: none;
              border-bottom: thin solid rgba(0, 0, 0, 0.12);
              margin: 8px 0;
            "
          />
          <slot name="exandable-area" :row="row">
            {{ row }}
          </slot>
        </div>
      </tr>
      <tr
        v-if="!loading && rows.length === 0"
        :class="{
          row: true,
          'table-row': true,
          'box-default': !filled,
          'box-filled': filled,
        }"
      >
        <td class="col" colspan="100" style="text-align: center">
          <slot name="no-data">
            <q-icon
              color="negative"
              name="fa-solid fa-triangle-exclamation"
              size="24px"
              style="margin-right: 4px"
            />
            {{ noDataLabel }}
          </slot>
        </td>
      </tr>
      <div v-if="pagination" class="row table-footer">
        <q-pagination
          v-model="pagination.page"
          @update:model-value="$emit('request')"
          color="primary"
          :max="pagination.pagesNumber"
          :max-pages="7"
          boundary-numbers
        />
      </div>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:pagination', 'update:sort', 'request'],
  props: {
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    sort: {
      type: Object,
      default: () => ({
        by: null as null | String,
        descending: false,
      })
    },
    tableHeaderClass: String,
    noDataLabel: {
      type: String,
      default: 'Sem resultados'
    },
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array<any>,
      default: () => [],
    },
    rows: {
      type: Array<any>,
      default: () => [],
    },
    disableTooltip: {
      type: Boolean,
      default: false,
    },
    expandableRows: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {}
  },
  methods: {
    toogleExpansion(row: any) {
      if (this.expandableRows) {
        for (const r of this.rows) {
          if (JSON.stringify(row) !== JSON.stringify(r)) {
            r.expanded = false
          }
        }
        row.expanded = !row.expanded
      }

    },
    sortBy(column: any) {
      if ('sortable' in column ? column.sortable : true) {
        if (this.sort.by !== column.name) {
        this.sort.by = column.name
        this.sort.descending = false
      } else {
        this.sort.descending = !this.sort.descending
      }

      this.$emit('request')
      }

    },
  },
})
</script>
<style scoped>
.table-wrapper {
  width: 100%;
  /* max-width: 500px; */
  overflow-x: auto;
}
table {
  min-width: 100%;
}

td:first-of-type {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px 0 0;
}

td:last-of-type {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0 0 8px;
}

td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
  cursor: pointer;
}
.table-header {
  padding: 12px;
  font-weight: bold;
  color: var(--q-primary);

  user-select: none;
  -webkit-user-select: none; /* Safari */
}
.table-header th:hover {
  cursor: pointer;
}

.table-header th:hover .q-icon {
  display: inline-flex !important;
}

.table-row {
  margin: 12px 0;
  padding: 12px;
}

.table-footer {
  justify-content: end;
  padding: 12px 0;
}

.q-pagination :deep(.q-btn-item.q-btn--flat) {
  margin: 0 2px;
}

.box-filled {
  /* 
  border: 1px solid rgba(0, 0, 0, 0.24);
   */
  padding: 8px;
  border-radius: 4px;
  background: #f5f5f5;
}
</style>
