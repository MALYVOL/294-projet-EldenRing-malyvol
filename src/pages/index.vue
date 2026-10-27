import { bossOverrides } from '@/data/bossOverrides'

<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Elden Ring Bosses
    </h1>

    <v-text-field
      v-model="search"
      clearable
      label="Rechercher un boss"
    />

    <v-row>
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
  import { computed, onMounted, ref } from 'vue'
  import BossCard from '@/components/BossCard.vue'
  import { bossOverrides } from '@/data/bossOverrides'

  const bosses = ref([])
  const search = ref('')
  const excludedBossIds = new Set([3, 11, 51, 66, 80, 87])

  onMounted(async () => {
    let page = 1
    let totalPages = 1
    const allBosses = []

    while (page <= totalPages) {
      const response = await fetch(
        `https://apis.divtec.me/api/elden-ring/bosses?limit=100&page=${page}`,
      )
      const json = await response.json()

      allBosses.push(...json.data)
      totalPages = json.pagination.pages
      page++
    }

    bosses.value = allBosses

      .filter(boss => !excludedBossIds.has(boss.id))
      .map(boss => {
        const override = bossOverrides[boss.id]

        return {
          ...boss,
          ...override, image: override?.image
            ? import.meta.env.BASE_URL + override.image
            : (boss.image
              ? 'https://apis.divtec.me' + boss.image
              : null),
        }
      })
    console.log('Telechargé depuis API:', allBosses.length)
    console.log('Après les bosses exclus:', bosses.value.length)
  })
  const filteredBosses = computed(() => {
    const text = (search.value ?? '').toLowerCase()

    return bosses.value.filter(boss =>
      boss.name.toLowerCase().includes(text),
    )
  })
</script>
