<script setup>
  // Resolve the logo path using the deployment base URL.
  const logoUrl = `${import.meta.env.BASE_URL}images/elden-ring-logo.png`
</script>

<template>
  <v-app-bar
    class="app-header"
    color="#1c1b19"
  >
    <v-app-bar-title>
      <div class="header-brand">
        <img alt="" class="header-logo" :src="logoUrl">
      </div>
    </v-app-bar-title>

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
  border-bottom: 1px solid #8a744a;
}

.app-header :deep(.v-app-bar-title) {
  color: #e0c58a;
  font-weight: 600;
}

.app-header :deep(.v-btn) {
  color: #c8aa6e;
  border-radius: 8px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.app-header :deep(.v-btn:hover) {
  color: #f2dfb4;
  background-color: #302a20;
}

.app-header :deep(.v-btn--active) {
  color: #f2dfb4;
  background-color: #302a20;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo {
  width: 250px;
  height: 100px;
  object-fit: contain;
}
</style>
