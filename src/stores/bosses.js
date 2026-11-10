import { defineStore } from 'pinia'
import { bossOverrides } from '@/data/bossOverrides'
import { extraBosses } from '@/data/extraBosses'
import api from '@/plugins/axios'

// Share boss data, loading status, and favorites across the application.
export const useBossStore = defineStore('bosses', {
  state: () => ({
    bosses: [],
    isLoading: false,
    error: null,
    favorites: [],
  }),

  getters: {
    totalBosses: state => state.bosses.length,
    getBossById: state => id => state.bosses.find(boss => boss.id === id),
    isFavorite: state => id => state.favorites.includes(id),
    getFavorites: state => state.bosses.filter(boss =>
      state.favorites.includes(boss.id),
    ),
  },

  actions: {
    // Restore favorites and load boss data at startup.
    async init () {
      this.loadFavorites()
      await this.fetchBosses()
    },

    // Add or remove a boss ID, then save the updated favorites.
    toggleFavorite (id) {
      const index = this.favorites.indexOf(id)

      if (index === -1) {
        this.favorites.push(id)
      } else {
        this.favorites.splice(index, 1)
      }
      this.saveFavorites()
    },

    // localStorage stores strings, so convert the ID array to JSON.
    saveFavorites () {
      localStorage.setItem('favoriteBosses', JSON.stringify(this.favorites))
    },

    // Restore saved IDs when a user returns to the application.
    loadFavorites () {
      const savedFavorites = localStorage.getItem('favoriteBosses')

      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites)
      }
    },

    // Load every API page and prepare the data for the catalog.
    async fetchBosses () {
      this.isLoading = true
      this.error = null

      try {
        const excludedBossIds = new Set([3, 11, 51, 66, 87])
        let page = 1
        let totalPages = 1
        const allBosses = []

        // The API returns limited results per page.
        while (page <= totalPages) {
          const response = await api.get('/bosses', {
            params: {
              limit: 100,
              page,
            },
          })
          const json = response.data

          allBosses.push(...json.data)
          totalPages = json.pagination.pages
          page++
        }

        // Exclude selected IDs and apply manual corrections and images.
        this.bosses = allBosses
          .filter(boss => !excludedBossIds.has(boss.id))
          .map(boss => {
            const override = bossOverrides[boss.id]

            return {
              ...boss,
              ...override,
              image: override?.image
                ? import.meta.env.BASE_URL + override.image
                : (boss.image
                    ? 'https://apis.divtec.me' + boss.image
                    : null),
            }
          })

        // Add local bosses only if the API does not already contain them.
        const apiNames = new Set(this.bosses.map(boss => boss.name.toLowerCase()))
        const newBosses = extraBosses
          .filter(boss => !apiNames.has(boss.name.toLowerCase()))
          .map(boss => {
            const override = bossOverrides[boss.id]

            return {
              ...boss,
              ...override,
              image: override?.image
                ? import.meta.env.BASE_URL + override.image
                : boss.image,
            }
          })

        this.bosses.push(...newBosses)
      } catch (error) {
        this.error = 'Impossible to fetch bosses'
        console.error(error)
      } finally {
        // Stop the loading indicator whether the request succeeds or fails.
        this.isLoading = false
      }
    },
  },
})
