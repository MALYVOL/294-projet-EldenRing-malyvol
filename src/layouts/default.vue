<template>
  <!-- Shared navigation, page content, and footer. -->
  <AppHeader />
  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
  import AppHeader from '@/components/AppHeader.vue'
</script>
