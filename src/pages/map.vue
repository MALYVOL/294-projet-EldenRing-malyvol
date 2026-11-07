<script setup>
  import L from 'leaflet'
  import { onMounted, onUnmounted, ref } from 'vue'
  import 'leaflet/dist/leaflet.css'

  const mapElement = ref(null)
  let map = null

  onMounted(() => {
    // Размеры исходного изображения в пикселях
    const width = 6780
    const height = 7049

    // Границы изображения: нижний левый и верхний правый углы
    const bounds = [[0, 0], [height, width]]

    map = L.map(mapElement.value, {
      crs: L.CRS.Simple,
      minZoom: -5,
      maxZoom: 1,
    })

    // Путь также работает при размещении проекта в подпапке
    const imageUrl = `${import.meta.env.BASE_URL}images/map.jpg`

    L.imageOverlay(imageUrl, bounds).addTo(map)

    // При открытии показываем карту целиком
    map.fitBounds(bounds)
  })

  onUnmounted(() => {
    if (map) {
      map.remove()
    }
  })
</script>

<template>
  <v-container fluid>
    <h1 class="text-h3 text-center my-6">
      Interactive Map
    </h1>

    <div ref="mapElement" class="map-window" />
  </v-container>
</template>

<style scoped>
.map-window {
  width: 100%;
  height: calc(100vh - 180px);
  min-height: 400px;
}

.leaflet-container {
  background: black;
}
</style>
