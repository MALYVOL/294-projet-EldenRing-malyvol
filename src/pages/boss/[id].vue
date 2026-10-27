<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBossStore } from '@/stores/bosses'

  const store = useRoute()
  const bossStore = useBossStore()

  const boss = computed(() => {
    return bossStore.getBossById(number(route.params.id))
  })
</script>

<template>
  <v-container>
    <h1 v-if="boss">{{ boss.name }}</h1>
    <p v-else>Boss not found or still loading...</p>
  </v-container>
</template>

<style scoped lang="sass">

</style>
