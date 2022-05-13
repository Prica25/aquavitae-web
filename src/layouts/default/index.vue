<template>
  <q-layout view="hHr lpR lfr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="fa fa-bars" @click="toggleLeftDrawer" />
        <q-icon class="q-ml-sm" name="fa fa-weight-scale" size="26px" />
        <q-toolbar-title> Nutrition App </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="text-black" style="background-color: #f5f5f5">
      Asd Asd
    </q-footer>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      leftDrawerOpen: false,
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },
})
</script>
<style>
#app {
  background-color: #f5f5f5;
}
</style>
