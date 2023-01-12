<template>
  <router-link :to="{ name: href }" custom v-slot="{ navigate }">
    <div class="option" @click="navigate">
      <q-icon class="logo" :name="`fa-solid fa-${icon}`" />
      <div class="description">{{ description }}</div>
    </div>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: 'asd',
    },
  },
})
</script>
<style scoped>
.option {
  width: 10vw;
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  transition: background-color 200ms linear;
  margin: 20px;
}

.option:hover {
  cursor: pointer;
  background-color: var(--q-primary);
}

.logo {
  font-size: 4em;
  color: var(--q-primary);
  transition: color 200ms linear;
}

.description {
  margin-top: 20px;
  font-size: 1.2em;
  color: #646464;
  transition: color 200ms linear;
}

.option:hover .logo,
.option:hover .description {
  color: white;
}
</style>
