<template>
  <div v-if="!noHeader" class="content-header row items-center">
    <div style="display: flex; flex-direction: column">
      <h4 class="title">{{ title }}</h4>
      <q-breadcrumbs
        v-if="breadcrumbs.length > 0"
        class="text-grey"
        style="margin-top: 4px"
      >
        <template v-slot:separator>
          <q-icon size="1em" name="fa-solid fa-chevron-right" />
        </template>

        <q-breadcrumbs-el
          v-for="bc in breadcrumbs"
          :icon="(bc as any).icon ? `fa-solid fa-${(bc as any).icon}` : undefined"
          :label="(bc as any).label"
          :to="{ name: (bc as any).href, params: (bc as any).params }"
        />
      </q-breadcrumbs>
    </div>

    <div class="q-space"></div>
    <slot name="right-header"></slot>
  </div>
  <div v-if="noHeader && breadcrumbs.length > 0" class="content-header row">
    <q-breadcrumbs v-if="breadcrumbs.length > 0" class="text-grey">
      <template v-slot:separator>
        <q-icon size="1em" name="fa-solid fa-chevron-right" />
      </template>

      <q-breadcrumbs-el
        v-for="bc in breadcrumbs"
        :icon="(bc as any).icon ? `fa-solid fa-${(bc as any).icon}` : undefined"
        :label="(bc as any).label"
        :to="{ name: (bc as any).href, params: (bc as any).params }"
      />
    </q-breadcrumbs>
  </div>
  <div
    :class="contentClass"
    :style="`flex-direction: ${direction}; display: ${display}`"
  >
    <slot name="content"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    verticalAlignment: {
      type: String,
      default: 'start',
    },
    horizontalAlignment: {
      type: String,
      default: 'start',
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'row',
    },
    display: {
      type: String,
      default: 'flex',
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    contentClass() {
      return `content-slot justify-${this.horizontalAlignment} items-${this.verticalAlignment} ${this.direction}`
    },
  },
})
</script>
<style scoped>
.title {
  font-size: 30px;
  color: #646464;
  margin: 0;
}
.content-header {
  margin-bottom: 16px;
}
.content-slot {
  flex: 1 1 auto;
  width: 80%;
  margin: 0 auto;
}
</style>
