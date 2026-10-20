<script setup>
  import {ref} from "vue";

  defineProps({
    boss: Object,
  })
</script>

<template>
  <v-card>
    <!-- Image du Boss -->
    <v-img
      v-if="boss.image"
      :alt="boss.name"
      cover
      height="200px"
      :src="'https://apis.divtec.me' + boss.image"
    />
    <!-- Nom du Boss -->
    <v-card-title>{{ boss.name }}</v-card-title>
    <!-- PV du Boss -->
    <v-card-subtitle>{{ boss.healthPoints }}</v-card-subtitle>
    <!-- Location du Boss -->
    <v-card-subtitle>{{ boss.location }}</v-card-subtitle>
    <!-- Drop du Boss -->
    <v-card-subtitle>{{ boss.drops.join(", ") }}</v-card-subtitle>
  </v-card>
</template>

<style scoped lang="sass">

</style>
