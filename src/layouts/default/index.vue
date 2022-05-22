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
          <router-link
            :to="{ name: item.href }"
            custom
            v-slot="{ navigate, isActive }"
          >
            <q-item-section :class="{ active: isActive }" @click="navigate">
              <q-icon :name="item.icon" />
              <span class="links_name">{{ item.text }}</span>
            </q-item-section>
          </router-link>

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
        <q-btn class="notification-btn" flat round icon="fa-solid fa-bell">
          <q-badge floating color="warning" rounded style="width: 12px" />
        </q-btn>
        <q-separator vertical inset />
        <q-btn-dropdown
          class="header-menu"
          flat
          dropdown-icon="fa-solid fa-chevron-down"
        >
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <div class="text-center">Paulo Pereira</div>
              <q-avatar
                color="transparent"
                text-color="white"
                size="36px"
                icon="fa-solid fa-user-circle"
              />
            </div>
          </template>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section class="text-center">Preferências</q-item-section>
            </q-item>
            <q-separator style="margin: 0 16px" />
            <q-item class="text-center" clickable v-close-popup>
              <q-item-section>Terminar Sessão</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-btn-dropdown>
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
})
</script>

<style scoped>
@import './default.css';
</style>
