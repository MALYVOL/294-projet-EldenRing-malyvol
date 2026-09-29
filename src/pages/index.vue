<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Test API
    </h1>

    <v-row>
      <ul>
        <li
          v-for="boss in champions"
          :key="boss.id"
        >
          {{ boss.name }}
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  const bosses = ref([])

  onMounted(async () => {
    const response = await fetch('https://apis.divtec.me/api/elden-ring/bosses?limit=100')
    const json = await response.json()
    bosses.value = json.data
  })
</script>
