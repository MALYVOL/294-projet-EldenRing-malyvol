<script setup>
  import { computed, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBossStore } from '@/stores/bosses'

  const route = useRoute()
  const bossStore = useBossStore()

  const boss = computed(() => {
    return bossStore.getBossById(Number(route.params.id))
  })

  watchEffect(() => {
    console.log('Detail boss:', boss.value)
  })
</script>

<template>
  <v-container>
    <v-btn to="/">
      Back to bosses
    </v-btn>
    <div v-if="boss">
      <h1>{{ boss.name }}</h1>

      <img
        v-if="boss.image"
        :alt="boss.name"
        :src="boss.image"
        width="400"
      >

      <p>Hp: {{ boss.healthPoints }}</p>
      <p>Location: {{ boss.location }}</p>
      <p>Region: {{ boss.region }}</p>
      <p>{{ boss.description }}</p>
      <p>Drops: {{ boss.drops }}</p>
    </div>
    <p v-else>Boss not found or still loading...</p>
  </v-container>
</template>

<style scoped lang="sass">

</style>
