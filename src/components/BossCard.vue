<script setup>
  import { useBossStore } from '@/stores/bosses.js'

  const bossStore = useBossStore()

  defineProps({
    boss: Object,
  })
</script>

<template>
  <v-card :to="`/boss/${boss.id}`">
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

    <v-card-actions>
      {{ bossStore.favorites }}
      <v-spacer />

      <v-btn
        :color="bossStore.isFavorite(boss.id) ? 'red' : undefined"
        :icon="bossStore.isFavorite(boss.id) ? 'mdi-heart' : 'mdi-heart-outline'"
        @click.stop.prevent="console.log('Clicked:', boss.id)"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="sass">

</style>
