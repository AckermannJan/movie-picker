export const state = () => ({
  movieList: [],
  loading: []
})

export const actions = {
  async loadMovies ({commit, dispatch}, nextCursor) {
    commit('toggleLoading', true)
    this.loadingMovies = true
    const startCursor = nextCursor || undefined
    const response = await fetch('/.netlify/functions/getDatabase', {
      method: 'POST',
      body: JSON.stringify({
        startCursor,
      }),
    }).then((res) => res.json())
    commit('set', response.results)
    if (response.has_more) {
      await dispatch('loadMovies', response.next_cursor)
    }
    commit('toggleLoading', false)
  }
}

export const mutations = {
  set(state, movieList) {
    state.movieList = [...state.movieList, ...movieList]
  },
  toggleLoading(state, isLoading) {
    state.loading = isLoading
  },
}
