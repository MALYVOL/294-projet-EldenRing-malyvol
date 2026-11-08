<script setup>
  import { useBossStore } from '@/stores/bosses.js'

  const bossStore = useBossStore()

  defineProps({
    boss: Object,
  })
</script>

<template>
  <v-card
    class="boss-card"
    :to="`/boss/${boss.id}`"
  >
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
      <v-spacer />

      <v-btn
        :color="bossStore.isFavorite(boss.id) ? 'red' : undefined"
        :icon="bossStore.isFavorite(boss.id) ? 'mdi-heart' : 'mdi-heart-outline'"
        @click.stop.prevent="bossStore.toggleFavorite(boss.id)"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.boss-card {
  height: 100%;
  overflow: hidden;
  background-color: #1c1b19;
  border: 1px solid #554a32;
  border-radius: 10px;
  color: #eee8da;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.boss-card:hover {
  transform: translateY(-5px);
  border-color: #c8aa6e;
}

.boss-card :deep(.v-card-title) {
  color: #e0c58a;
  font-weight: 600;
  white-space: normal;
}

.boss-card :deep(.v-card-subtitle) {
  color: #d2cabe;
  opacity: 1;
  white-space: normal;
}

.boss-card :deep(.v-card-actions) {
  padding: 8px 12px;
}
</style>
