export const state = () => ({
  genreList: [],
  loading: []
})

export const actions = {
  async loadGenre ({commit}) {
    commit('toggleLoading', true)
    const response = await fetch('/.netlify/functions/getDatabaseFormat').then((res) => res.json())
    commit('set', response.properties.Genre.select.options.map(option => option))
    commit('toggleLoading', false)
  }
}

export const mutations = {
  set(state, genreList) {
    state.genreList = genreList
  },
  toggleLoading(state, isLoading) {
    state.loading = isLoading
  },
}
