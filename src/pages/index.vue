<template>
  <v-container>
    <div class="catalog-heading">
      <p class="catalog-label">THE LANDS BETWEEN</p>

      <h1>All Bosses</h1>

      <p class="boss-count">
        {{ totalBosses }} bosses to discover
      </p>
    </div>

    <p>Number of bosses: {{ totalBosses }}</p>

    <v-row align="center" class="boss-filters">
      <v-col cols="12" md="5">
        <v-text-field
          v-model="search"
          clearable
          hide-details
          label="Search the boss"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" md="5">
        <v-select
          v-model="selectedRegion"
          clearable
          hide-details
          :items="regions"
          label="Filter by region"
          prepend-inner-icon="mdi-filter-variant"
          variant="outlined"
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
        v-for="boss in paginatedBosses"
        :key="boss.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <BossCard :boss="boss" />
      </v-col>
    </v-row>
    <v-pagination
      v-if="!isLoading && !error && pageCount > 1"
      v-model="currentPage"
      class="my-8"
      :length="pageCount"
      rounded="circle"
    />
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, ref, watch } from 'vue'
  import BossCard from '@/components/BossCard.vue'
  import { useBossStore } from '@/stores/bosses'

  const bossStore = useBossStore()
  const { bosses, totalBosses, isLoading, error } = storeToRefs(bossStore)

  const search = ref('')
  const sortAscending = ref(true)
  const selectedRegion = ref(null)
  const currentPage = ref(1)
  const bossesPerPage = 40

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

  const pageCount = computed(() => {
    return Math.ceil(filteredBosses.value.length / bossesPerPage)
  })

  const paginatedBosses = computed(() => {
    const start = (currentPage.value - 1) * bossesPerPage

    return filteredBosses.value.slice(start, start + bossesPerPage)
  })

  watch([search, selectedRegion, sortAscending], () => {
    currentPage.value = 1
  })
</script>

<style scoped>
.catalog-heading {
  padding: 32px 0;
  text-align: center;
}

.catalog-label {
  margin-bottom: 8px;
  color: #a89162;
  font-size: 0.8rem;
  letter-spacing: 0.25em;
}

.catalog-heading h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.15;
}

.boss-count {
  margin-top: 12px;
  color: #c9c2b5;
}

/* Поиск и выбор региона */
.boss-filters :deep(.v-field) {
  background-color: #1c1b19;
  border-radius: 8px;
  color: #eee8da;
}

.boss-filters :deep(.v-field__outline) {
  color: #8a744a;
}

.boss-filters :deep(.v-label),
.boss-filters :deep(.v-icon) {
  color: #c8aa6e;
}

/* Кнопка сортировки */
.boss-filters :deep(.v-btn) {
  background-color: #1c1b19;
  border: 1px solid #8a744a;
  border-radius: 8px;
  color: #e0c58a;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.boss-filters :deep(.v-btn:hover) {
  background-color: #302a20;
}
</style>
