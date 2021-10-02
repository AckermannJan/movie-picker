/*
  Movie images
  Banner: https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/<<path>>
  Profile Pic: https://www.themoviedb.org/t/p/w138_and_h175_face/<<path>>
  Movie Cover medium: https://www.themoviedb.org/t/p/w300_and_h450_bestv2/<<path>>
  Movie Cover large: https://www.themoviedb.org/t/p/w600_and_h900_bestv2/<<path>>
 */

export const state = () => ({
  movieDetails: {},
  movieCredits: {},
  searchResult: [],
  detailsLoading: false,
  creditsLoading: false,
  searchLoading: false,
})

export const actions = {
  async loadMovieDetails ({commit}, movieId) {
    commit('toggleDetailsLoading', true)
    const response = await fetch('/.netlify/functions/getMovieDetails', {
      method: 'POST',
      body: JSON.stringify({
        movieId,
      }),
    }).then((res) => res.json())
    commit('setDetails', response)
    commit('toggleDetailsLoading', false)
  },
  async loadMovieCredits ({commit}, movieId) {
    commit('toggleCreditsLoading', true)
    const response = await fetch('/.netlify/functions/getMovieCredits', {
      method: 'POST',
      body: JSON.stringify({
        movieId,
      }),
    }).then((res) => res.json())
    commit('setCredits', response)
    commit('toggleCreditsLoading', false)
  },
  async searchMovie ({commit}, searchString) {
    commit('toggleSearchLoading', true)
    const response = await fetch('/.netlify/functions/searchMovie', {
      method: 'POST',
      body: JSON.stringify({
        searchString,
      }),
    }).then((res) => res.json())
    commit('setSearch', response)
    commit('toggleSearchLoading', false)
  },
  async selectMovie ({dispatch, state}, movieName) {
    await dispatch('searchMovie', movieName)
    console.log(state.searchResult.results)
    const firstResultId = state.searchResult.results[0].id
    return await Promise.all([
      dispatch('loadMovieDetails', firstResultId),
      dispatch('loadMovieCredits', firstResultId),
    ])
  }
}

export const mutations = {
  setDetails(state, movieDetails) {
    console.log(movieDetails)
    state.movieDetails = movieDetails
  },
  setCredits(state, movieCredits) {
    console.log(movieCredits)
    state.movieCredits = movieCredits
  },
  setSearch(state, searchResult) {
    state.searchResult = searchResult
  },
  toggleDetailsLoading(state, isLoading) {
    state.detailsLoading = isLoading
  },
  toggleCreditsLoading(state, isLoading) {
    state.creditsLoading = isLoading
  },
  toggleSearchLoading(state, isLoading) {
    state.searchLoading = isLoading
  },
}
