<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useBossStore } from '@/stores/bosses'

  const bossStore = useBossStore()

  onMounted(() => {
    bossStore.init()
  })
</script>

<style>
.v-application {
  background-color: #11110f;
  color: #eee8da;
}

.v-application h1 {
  color: #e0c58a;
  font-family: inherit;
}

.page-heading {
  font-size: 3rem;
  line-height: 1.2;
}
</style>
