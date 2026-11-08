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

    <div
      v-else-if="!error && favoriteBosses.length === 0"
      class="empty-favorites"
    >
      <v-icon
        class="mb-4"
        icon="mdi-heart-outline"
        size="56"
      />

      <h2>No favorite bosses yet</h2>

      <p>
        Explore the bosses and add your favorites by clicking the heart.
      </p>

      <v-btn
        class="mt-5"
        to="/"
        variant="outlined"
      >
        Explore bosses
      </v-btn>
    </div>

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

<style scoped>


.empty-favorites {
  max-width: 520px;
  margin: 70px auto;
  padding: 40px 24px;
  text-align: center;
  color: #eee8da;
  background-color: #1c1b19;
  border: 1px solid #554a32;
  border-radius: 12px;
}

.empty-favorites .v-icon {
  color: #c8aa6e;
}

.empty-favorites h2 {
  margin-bottom: 12px;
}

.empty-favorites p {
  color: #c9c2b5;
}
</style>
