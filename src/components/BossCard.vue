<script setup>
  defineProps({
    boss: Object,
  })
</script>

<template>
  <v-card>
    <!-- Image du Boss -->
    <img
      v-if="boss.image"
      :alt="boss.name"
      :src="boss.image"
      style="display: block; width: 100%; height: 250px; object-fit: cover;"
    >
    <!-- Nom du Boss -->
    <v-card-title>{{ boss.name }}</v-card-title>
    <!-- PV du Boss -->
    <v-card-subtitle>{{ boss.healthPoints + " HP" }}</v-card-subtitle>
    <!-- Location du Boss -->
    <v-card-subtitle>{{ boss.location }}</v-card-subtitle>
    <!-- Drop du Boss -->
    <v-card-subtitle>{{ boss.drops.join(", ") }}</v-card-subtitle>
  </v-card>
</template>

<style scoped lang="sass">

</style>
