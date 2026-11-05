<script setup>

</script>

<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Favorite Bosses
    </h1>

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

    <p v-if="isLoading">
      Loading bosses...
    </p>

    <p v-else-if="!error && favoriteBosses.length === 0">
      No favorite bosses yet.
    </p>

    <v-row v-else>
      <v-col
        v-for="boss in favoriteBosses"
        :key="boss.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <BossCard :boss="boss" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useBossStore } from '@/stores/bosses'

  const bossStore = useBossStore()
  const { getFavorites: favoriteBosses, isLoading, error } = storeToRefs(bossStore)
</script>

<style scoped lang="sass">

</style>
