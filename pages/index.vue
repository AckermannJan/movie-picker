<template>
  <main>
    <h1>Movies</h1>
    {{ loadingGenre ? 'Getting genre' : null }}<br>
    {{ loadingMovies ? 'Getting Movies' : null }}
    <ul>
      <li v-for="genre in genreList" :key="genre.id">
        {{ genre.name }}
      </li>
    </ul>
    <ul>
      <li v-for="movie in movieList" :key="movie.id">
        {{ movie.properties.Titel.title[0].text.content }}
      </li>
    </ul>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      movieList: state => state.movies.movieList,
      loadingMovies: state => state.movies.loading,
      loadingGenre: state => state.genre.loading,
      genreList: state => state.genre.genreList,
    })
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/loadMovies',
      loadGenre: 'genre/loadGenre',
    }),
  },
  mounted() {
    this.loadGenre()
    this.loadMovies()
  },
}
</script>
