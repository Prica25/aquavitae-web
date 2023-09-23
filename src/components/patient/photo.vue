<template>
  <q-avatar
    size="50px"
    color="primary"
    text-color="white"
    style="margin-right: 12px"
  >
    <q-icon v-if="true" name="fa-solid fa-user" />
    <img v-if="false" src="https://cdn.quasar.dev/img/avatar.png" />
  </q-avatar>
</template>
