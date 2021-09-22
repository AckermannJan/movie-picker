<template>
  <el-container>
    <el-main>
      <GenreSelector />
      {{ loadingMovies ? 'Getting Movies' : null }}
      <ul>
        <li v-for="movie in movieList" :key="movie.id">
          {{ movie.properties.Titel.title[0].text.content }}
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GenreSelector from "~/components/GenreSelector/GenreSelector";

export default {
  components: {GenreSelector},
  computed: {
    ...mapState({
      movieList: state => state.movies.movieList,
      loadingMovies: state => state.movies.loading,
    })
  },
  mounted() {
    this.loadMovies()
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/loadMovies',
    })
  },
}
</script>

<style lang="scss">
body {
  font-family: "Helvetica Neue","sans-serif";
}
</style>
