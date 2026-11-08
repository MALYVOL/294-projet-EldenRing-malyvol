<script setup>
  import L from 'leaflet'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { MARKERS } from '@/data/markers.js'
  import { useBossStore } from '@/stores/bosses.js'
  import 'leaflet/dist/leaflet.css'

  const mapElement = ref(null)
  const bossStore = useBossStore()
  let map = null

  // Names used by map markers when the boss has a different name in the API.
  const markerNames = {
    'Miranda Blossom': 'Miranda The Blighted Bloom',
    'Erdtree Burial Watchdog': 'Burial Tree Watchdog',
    'Erdtree Burial Watchdog (Sword)': 'Burial Tree Watchdog',
    'Spiritcaller Snail': 'Spirit-caller Snail',
    'Fell Twin': 'Fell Twins',
    'Night\'s Cavalry (Glaive)': 'Night\'s Cavalry',
    'Mad Pumpkin Head (Hammer)': 'Mad Pumpkin Head',
    'Cleanrot Knight (Spear)': 'Cleanrot Knight',
    'Crystalian': 'Crystalians',
    'Crystalian (Staff)': 'Crystalians',
    'Crystalian (Ringblade)': 'Crystalians',
    'Putrid Crystalian (Spear)': 'Putrid Crystalian',
    'Full-Grown Fallingstar Beast': 'Fallingstar Beast',
    'Abductor Virgin (Swinging Sickle)': 'Abductor Virgins',
    'Beastman of Farum Azula (Cleaver)': 'Beastman Of Farum Azula',
  }

  // Godfrey has two different encounters that share the same marker name.
  const bossIdsByMarker = { b11000850: 53, b11050800: 52 }

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
      marker.cat === 'boss' && marker.master === 'M00'
      && !['b21000850', 'b21010800'].includes(marker.id),
    )

    const radahnGrace = MARKERS.find(marker => marker.id === 'g76422')
    if (radahnGrace) {
      bossMarkers.push({ ...radahnGrace, id: 'boss-starscourge-radahn', cat: 'boss' })
    }

    const markerPositions = {
      b13000800: { x: 8680, y: 4460 }, // Maliketh
      b13000830: { x: 8500, y: 4600 }, // Dragonlord Placidusax
      b13000850: { x: 8450, y: 4310 }, // Godskin Duo
    }

    const savedMarkers = JSON.parse(
      localStorage.getItem('defeatedBossMarkers') || '[]',
    )

    const defeatedMarkers = new Set(savedMarkers)

    for (const marker of bossMarkers) {
      let defeated = defeatedMarkers.has(marker.id)

      const position = markerPositions[marker.id] ?? {
        x: marker.px,
        y: marker.py,
      }

      const circle = L.circleMarker(mapPoint(position.x, position.y), {
        radius: 8,
        color: defeated ? '#666666' : '#6e542b',
        fillColor: defeated ? '#888888' : '#d5b66f',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(() => {
          const bossName = markerNames[marker.name] ?? marker.name
          const bossId = bossIdsByMarker[marker.id]
          const boss = bossStore.bosses.find(boss =>
            bossId === undefined
              ? boss.name.toLowerCase() === bossName.toLowerCase()
              : boss.id === bossId,
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
        }, {
          className: 'boss-map-tooltip',
          direction: 'top',
          opacity: 1,
        })

      circle.on('click', () => {
        defeated = !defeated

        if (defeated) {
          defeatedMarkers.add(marker.id)
        } else {
          defeatedMarkers.delete(marker.id)
        }

        localStorage.setItem(
          'defeatedBossMarkers',
          JSON.stringify([...defeatedMarkers]),
        )

        circle.setStyle({
          color: defeated ? '#666666' : '#6e542b',
          fillColor: defeated ? '#888888' : '#d5b66f',
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
    <h1 class="page-heading text-center my-6">
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

.map-window::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 450;
  pointer-events: none;
  box-shadow: inset 0 0 80px 30px #11110f;
}

.map-window :deep(.boss-map-tooltip) {
  width: 240px;
  padding: 0;
  overflow: hidden;
  white-space: normal;
  background: #1c1b19;
  border: 1px solid #8a744a;
  border-radius: 10px;
  color: #eee8da;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.map-window :deep(.boss-tooltip) {
  display: flex;
  flex-direction: column;
}

.map-window :deep(.boss-tooltip img) {
  order: -1;
  display: block;
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.map-window :deep(.boss-tooltip strong) {
  padding: 12px 14px 8px;
  color: #d8bb80;
  font-size: 1rem;
  line-height: 1.3;
}

.map-window :deep(.boss-tooltip p) {
  margin: 0;
  padding: 0 14px 10px;
  color: #d2cabe;
  font-size: 0.85rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.text-h3 text-center my-6 {
  color: #e0c58a;
  font-family: inherit;
}
</style>
