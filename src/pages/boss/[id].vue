<script setup>
  import { computed, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBossStore } from '@/stores/bosses'

  const route = useRoute()
  const bossStore = useBossStore()

  // Route parameters are strings; convert the ID to a number for the store.
  const boss = computed(() => {
    return bossStore.getBossById(Number(route.params.id))
  })

  // Log changes to the selected boss for debugging.
  watchEffect(() => {
    console.log('Detail boss:', boss.value)
  })
</script>

<template>
  <v-container class="boss-page py-8">
    <v-btn
      class="mb-6"
      prepend-icon="mdi-arrow-left"
      to="/"
      variant="text"
    >
      Back to bosses
    </v-btn>

    <div v-if="boss" class="boss-detail">
      <div class="boss-image">
        <img
          v-if="boss.image"
          :alt="boss.name"
          :src="boss.image"
        >

        <div v-else class="image-placeholder">
          No image available
        </div>
      </div>

      <div class="boss-info">
        <p class="boss-label">
          ELDEN RING BOSS
        </p>

        <h1>{{ boss.name }}</h1>

        <p class="boss-description">
          {{ boss.description || 'No description available.' }}
        </p>

        <div class="boss-stats">
          <div class="stat">
            <span class="stat-label">Health</span>
            <span>{{ boss.healthPoints || 'Unknown' }} HP</span>
          </div>

          <div class="stat">
            <span class="stat-label">Region</span>
            <span>{{ boss.region || 'Unknown' }}</span>
          </div>

          <div class="stat">
            <span class="stat-label">Location</span>
            <span>{{ boss.location || 'Unknown' }}</span>
          </div>
        </div>

        <div class="boss-drops">
          <h2>Drops</h2>

          <ul v-if="boss.drops?.length">
            <li v-for="drop in boss.drops" :key="drop">
              {{ drop }}
            </li>
          </ul>

          <p v-else>
            No drops available.
          </p>
        </div>
      </div>
    </div>

    <p v-else>
      Boss not found or still loading...
    </p>
  </v-container>
</template>

<style scoped>
.boss-page {
  max-width: 1200px;
}

.boss-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 32px;
  background-color: #1c1b19;
  border: 1px solid #554a32;
  border-radius: 12px;
  color: #eee8da;
}

.boss-image img {
  display: block;
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 8px;
}

.image-placeholder {
  display: grid;
  place-items: center;
  min-height: 300px;
  background-color: #292722;
  border-radius: 8px;
  color: #b9af98;
}

.boss-label {
  color: #c8aa6e;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
}

.boss-info h1 {
  margin: 8px 0 20px;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
}

.boss-description {
  margin-bottom: 24px;
  color: #c9c2b5;
  line-height: 1.7;
}

.boss-stats {
  display: grid;
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid #554a32;
  border-bottom: 1px solid #554a32;
}

.stat {
  display: grid;
  gap: 4px;
}

.stat-label {
  color: #c8aa6e;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.boss-drops {
  margin-top: 24px;
}

.boss-drops h2 {
  margin-bottom: 12px;
  color: #c8aa6e;
  font-size: 1.25rem;
}

.boss-drops ul {
  padding-left: 20px;
  line-height: 1.8;
}

@media (max-width: 700px) {
  .boss-detail {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }

  .boss-image img {
    max-height: 400px;
  }
}
</style>
