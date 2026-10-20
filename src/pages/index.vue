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

  const bosses = ref([])
  const search = ref('')

  onMounted(async () => {
    const response = await fetch('https://apis.divtec.me/api/elden-ring/bosses?limit=100')
    const json = await response.json()
    bosses.value = json.data
  })
  const filteredBosses = computed(() => {
    const text = (search.value ?? '').toLowerCase()

    return bosses.value.filter(boss =>
      boss.name.toLowerCase().includes(text),
    )
  })
</script>
