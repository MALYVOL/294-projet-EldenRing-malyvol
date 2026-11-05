import { defineStore } from 'pinia'
import { bossOverrides } from '@/data/bossOverrides'
import api from '@/plugins/axios'

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
    async init () {
      this.loadFavorites()
      await this.fetchBosses()
    },

    toggleFavorite (id) {
      const index = this.favorites.indexOf(id)

      if (index === -1) {
        this.favorites.push(id)
      } else {
        this.favorites.splice(index, 1)
      }
      this.saveFavorites()
    },

    saveFavorites () {
      localStorage.setItem('favoriteBosses', JSON.stringify(this.favorites))
    },

    loadFavorites () {
      const savedFavorites = localStorage.getItem('favoriteBosses')

      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites)
      }
    },

    async fetchBosses () {
      this.isLoading = true
      this.error = null

      try {
        const excludedBossIds = new Set([3, 11, 51, 66, 80, 87])
        let page = 1
        let totalPages = 1
        const allBosses = []

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
      } catch (error) {
        this.error = 'Impossible to fetch bosses'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
