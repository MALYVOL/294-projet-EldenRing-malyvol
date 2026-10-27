import { defineStore } from 'pinia'
import { bossOverrides } from '@/data/bossOverrides'
import api from '@/plugins/axios'

export const useBossStore = defineStore('bosses', {
  state: () => ({
    bosses: [],
  }),

  actions: {
    async fetchBosses () {
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
            ...override, image: override?.image
              ? import.meta.env.BASE_URL + override.image
              : (boss.image
                  ? 'https://apis.divtec.me' + boss.image
                  : null),
          }
        })
    },
  },
})
