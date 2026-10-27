<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Elden Ring Bosses
    </h1>

    <p>Number of bosses: {{ totalBosses }}</p>

    <v-text-field
      v-model="search"
      clearable
      label="Rechercher un boss"
    />

    <v-row v-if="isLoading">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-skeleton-loader type="image, article" />
      </v-col>
    </v-row>

    <v-row v-else>
      <!-- Bosses -->
      <v-col
        v-for="boss in filteredBosses"
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
  import { computed, ref } from 'vue'
  import BossCard from '@/components/BossCard.vue'
  import { useBossStore } from '@/stores/bosses'

  const bossStore = useBossStore()
  const { bosses, totalBosses, isLoading } = storeToRefs(bossStore)
  const search = ref('')

  const filteredBosses = computed(() => {
    const text = (search.value ?? '').toLowerCase()

    return bosses.value.filter(boss =>
      boss.name.toLowerCase().includes(text),
    )
  })
</script>
