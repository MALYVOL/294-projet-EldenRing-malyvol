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
