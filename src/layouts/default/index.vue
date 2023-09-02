<template>
  <q-layout id="app">
    <div :class="{ sidebar: true, open: menuOpen }">
      <div class="logo-details">
        <div class="image" />
        <q-icon
          :name="`fa-solid fa-${menuOpen ? 'bars-staggered' : 'bars'}`"
          id="btn"
          @click="menuOpen = !menuOpen"
        />
      </div>
      <q-list class="menu-top">
        <q-item
          v-for="item in menuTopItems"
          :key="item.href"
          clickable
          v-ripple
        >
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
      <q-space />
      <q-list class="menu-bottom">
        <q-item
          v-for="item in menuBottomItems"
          :key="item.href"
          clickable
          v-ripple
        >
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
          <template #prepend>
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
          <template #label>
            <div class="row items-center no-wrap">
              <div class="text-center">{{ userStore.getName }}</div>
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
            <q-item
              class="text-center"
              clickable
              @click="$router.push('/login')"
              v-close-popup
            >
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
    <DialogWrapper />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DialogWrapper } from 'vue3-promise-dialog'
import MenuItems from './menu'

import { useUserStore } from '@/stores/user'

export default defineComponent({
  components: {
    DialogWrapper,
  },
  data() {
    return {
      userStore: useUserStore(),
      menuTopItems: MenuItems.filter(
        (item) => item.position?.toLowerCase() === 'top' || !item.position
      ),
      menuBottomItems: MenuItems.filter(
        (item) => item.position?.toLowerCase() === 'bottom'
      ),
      menuOpen: false,
      search: '',
    }
  },
})
</script>

<style scoped>
@import './default.css';
</style>

<style>
.box-default {
  background-color: white;
  /* margin: 14px 0;
  padding: 14px;
  height: 68px; */
  border-radius: 8px;
  align-items: center;
  box-shadow: -2px 2px 10px -8px rgba(0, 0, 0, 0.75);
}
</style>
