
export const clipsLengthSelector = selector<number>({
  key: 'clipsLengthSelector',
  get: async ({ get }) => {
    const tenantId = get(tenantIdState)
    if (tenantId === null) return 0

    try {
      const res = await cameraClipService.fetch(tenantId)
      return res.length ?? 0
    } catch (error) {
      console.error('Error fetching clips:', error)
      return 0
    }
  }
})
