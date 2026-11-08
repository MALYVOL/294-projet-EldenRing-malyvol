<script setup>

</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Elden Ring Bosses</v-app-bar-title>

    <v-btn to="/" prepend-icon="mdi-sword-cross">
      Bosses
    </v-btn>

    <v-btn
      to="/favorites"
      icon="mdi-heart"
      aria-label="Favorites"
    />

    <v-btn
      to="/about"
      icon="mdi-information"
      aria-label="About"
    />

    <v-btn
      to="/map"
      icon="mdi-map"
      aria-label="Interactive map"
    />
  </v-app-bar>
</template>

<style scoped lang="sass">

</style>
