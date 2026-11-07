<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'

  const mapElement = ref(null)
  let map = null

  onMounted(() => {
    const imageSize = 10496
    const nativeZoom = 6
    const scale = 2 ** nativeZoom

    // Перевод координат изображения в координаты Leaflet
    function mapPoint (x, y) {
      return L.latLng(-y / scale, x / scale)
    }

    const bounds = L.latLngBounds(
      mapPoint(0, imageSize),
      mapPoint(imageSize, 0),
    )

    map = L.map(mapElement.value, {
      crs: L.CRS.Simple,
      minZoom: 1,
      maxZoom: 7,
    })

    // В этом архиве порядок папок: уровень / y / x
    const tileUrl = `${import.meta.env.BASE_URL}ctiles/M00/base/{z}/{y}/{x}.webp`

    L.tileLayer(tileUrl, {
      tileSize: 256,
      minNativeZoom: 0,
      maxNativeZoom: nativeZoom,
      noWrap: true,
      bounds,
    }).addTo(map)

    map.fitBounds(bounds)

    // Первая проверочная метка из файла markers.js
    L.circleMarker(mapPoint(3097.4, 6460.4), {
      radius: 8,
      color: 'darkred',
      fillColor: 'red',
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip('Godrick the Grafted')
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
  background: black;
}
</style>
