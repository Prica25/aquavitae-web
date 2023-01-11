<template>
  <div class="option">
    <q-icon class="logo" name="fa-solid fa-utensils" />
    <div class="description">Refeições</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
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
}

.option:hover {
  cursor: pointer;
  background-color: var(--q-primary);
}

.logo {
  font-size: 4em;
  color: var(--q-primary);
}

.description {
  margin: 10px;
  font-size: 1.2em;
  color: #646464;
}

.option:hover .logo,
.option:hover .description {
  color: white;
}
</style>
