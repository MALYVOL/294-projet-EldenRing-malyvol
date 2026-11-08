<script setup>

</script>

<template>
  <v-app-bar class="app-header">
    <v-app-bar-title>Elden Ring Bosses</v-app-bar-title>

    <v-btn prepend-icon="mdi-sword-cross" to="/">
      Bosses
    </v-btn>

    <v-btn
      aria-label="Favorites"
      icon="mdi-heart"
      to="/favorites"
    />

    <v-btn
      aria-label="About"
      icon="mdi-information"
      to="/about"
    />

    <v-btn
      aria-label="Interactive map"
      icon="mdi-map"
      to="/map"
    />
  </v-app-bar>
</template>

<style scoped>
.app-header {
  background-color: #1c1b19;
  border-bottom: 1px solid #554a32;
}

.app-header :deep(.v-app-bar-title) {
  color: #e0c58a;
  font-weight: 600;
}

.app-header :deep(.v-btn) {
  color: #eee8da;
}

.app-header :deep(.v-btn:hover) {
  color: #e0c58a;
}
</style>
