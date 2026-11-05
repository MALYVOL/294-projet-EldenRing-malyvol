<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      All Bosses
    </h1>

    <p>Number of bosses: {{ totalBosses }}</p>

    <v-row align="center">
      <v-col cols="12" md="5">
        <v-text-field
          v-model="search"
          clearable
          hide-details
          label="Search the boss"
        />
      </v-col>

      <v-col cols="12" md="5">
        <v-select
          v-model="selectedRegion"
          clearable
          hide-details
          :items="regions"
          label="Filter by region"
        />
      </v-col>

      <v-col cols="12" md="2">
        <v-btn
          block
          height="56"
          @click="sortAscending = !sortAscending"
        >
          {{ sortAscending ? 'A–Z' : 'Z–A' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

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

    <p v-else-if="!error && filteredBosses.length === 0">
      No bosses found.
    </p>

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
  const { bosses, totalBosses, isLoading, error } = storeToRefs(bossStore)

  const search = ref('')
  const sortAscending = ref(true)
  const selectedRegion = ref(null)

  const regions = computed(() => {
    const names = bosses.value.map(boss => boss.region)
    return [...new Set(names.filter(Boolean))]
  })

  const filteredBosses = computed(() => {
    const text = (search.value ?? '').toLowerCase()

    return bosses.value
      .filter(boss => !selectedRegion.value || boss.region === selectedRegion.value)
      .filter(boss => boss.name.toLowerCase().includes(text))
      .toSorted((a, b) => {
        if (sortAscending.value) {
          return a.name.localeCompare(b.name)
        }

        return b.name.localeCompare(a.name)
      })
  })
</script>
