<template>
  <q-layout id="app">
    <div :class="{ sidebar: true, open: menuOpen }">
      <div class="logo-details">
        <q-icon name="fa-solid fa-droplet" class="icon" />
        <div class="logo_name">Aquavitae</div>
        <q-icon
          :name="`fa-solid fa-${menuOpen ? 'bars-staggered' : 'bars'}`"
          id="btn"
          @click="menuOpen = !menuOpen"
        />
      </div>
      <q-list>
        <q-item v-for="item in menuItems" :key="item.href" clickable v-ripple>
          <q-item-section>
            <q-icon :name="item.icon" />
            <span class="links_name">{{ item.text }}</span>
          </q-item-section>
          <span class="tooltip">{{ item.text }}</span>
        </q-item>
      </q-list>
    </div>
    <q-page-container class="home-section">
      <q-header class="header row items-center">
        <q-input
          class="search-box"
          v-model="search"
          placeholder="Procurar por pacientes"
        >
          <template v-slot:prepend>
            <q-icon size="18px" name="fa-solid fa-magnifying-glass" />
          </template>
        </q-input>
        <q-space />
        <q-btn dense flat round icon="fa-solid fa-bell">
          <q-badge floating color="red" rounded style="width: 12px" />
        </q-btn>
        <q-separator vertical inset />
        <q-btn flat label="Content">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item inset clickable>
                <q-item-section>New tab</q-item-section>
              </q-item>
              <q-separator />
              <q-item inset clickable>
                <q-item-section>New incognito tab</q-item-section>
              </q-item>
              <q-separator />
              <q-item inset clickable>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-header>
      <div class="page-content">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuItems from './menu'

export default defineComponent({
  data() {
    return {
      menuItems: MenuItems,
      menuOpen: false,
      search: '',
    }
  },
  mounted() {
    console.log(MenuItems, this.menuItems)
  },
})
</script>

<style scoped>
@import './default.css';
</style>
