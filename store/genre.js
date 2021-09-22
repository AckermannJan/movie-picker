export const state = () => ({
    genreList: [],
    loading: false,
    selectedGenres: []
})

export const actions = {
    async loadGenre ({commit}) {
        commit('toggleLoading', true)
        const response = await fetch('/.netlify/functions/getDatabaseFormat').then((res) => res.json())
        commit('set', response.properties.Genre.select.options.map(option => option))
        commit('toggleLoading', false)
    },
    selectGenre ({commit}, genre) {
        commit('selectGenre', genre)
    },
    deselectGenre ({commit}, genre) {
        commit('deselectGenre', genre)
    },
}

export const mutations = {
    set(state, genreList) {
        state.genreList = genreList;
    },
    toggleLoading(state, isLoading) {
        state.loading = isLoading;
    },
    selectGenre(state, genre) {
        state.selectedGenres.push(genre);
    },
    deselectGenre(state, genre) {
        state.selectedGenres.forEach((selectedGenre, index) => {
          if (selectedGenre.id === genre.id) {
              state.selectedGenres.splice(index, 1);
          }
        })
    }
}
