<script setup>
  import L from 'leaflet'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { MARKERS } from '@/data/markers.js'
  import { useBossStore } from '@/stores/bosses.js'
  import 'leaflet/dist/leaflet.css'

  const mapElement = ref(null)
  const bossStore = useBossStore()
  let map = null

  onMounted(() => {
    const imageSize = 10_496
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

    const bossMarkers = MARKERS.filter(marker =>
      marker.cat === 'boss' && marker.master === 'M00',
    )

    for (const marker of bossMarkers) {
      let defeated = false

      const circle = L.circleMarker(mapPoint(marker.px, marker.py), {
        radius: 8,
        color: 'darkred',
        fillColor: 'red',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(() => {
          const boss = bossStore.bosses.find(boss =>
            boss.name.toLowerCase() === marker.name.toLowerCase(),
          )

          const card = document.createElement('div')
          card.className = 'boss-tooltip'

          const name = document.createElement('strong')
          name.textContent = boss ? boss.name : marker.name
          card.append(name)

          if (boss) {
            if (boss.image) {
              const image = document.createElement('img')
              image.src = boss.image
              image.alt = boss.name
              image.style.width = '180px'
              image.style.display = 'block'
              card.append(image)
            }

            const hp = document.createElement('p')
            hp.textContent = `HP: ${boss.healthPoints ?? 'Unknown'}`
            card.append(hp)

            const location = document.createElement('p')
            location.textContent = `Location: ${boss.location ?? 'Unknown'}`
            card.append(location)
          } else {
            const message = document.createElement('p')
            message.textContent = 'Boss details not found.'
            card.append(message)
          }

          return card
        })

      circle.on('click', () => {
        defeated = !defeated

        circle.setStyle({
          color: defeated ? 'dimgray' : 'darkred',
          fillColor: defeated ? 'gray' : 'red',
        })
      })
    }
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
