<template>
  <el-container>
    <el-main>
      <el-button :loading="loadingMovieDetails" @click="loadMovieDetails(2080)">
        Load details
      </el-button>
      <el-button :loading="loadingMovieCredits" @click="loadMovieCredits(2080)">
        Load Credits
      </el-button>
      <el-button :loading="loadingSearchMovie" @click="searchMovie('X-Men Origins: Wolverine')">
        run search
      </el-button>
      <GenreSelector />
      {{ loadingMovies ? 'Getting Movies' : null }}
      <ul>
        <li v-for="movie in movieList" :key="movie.id" @click="selectMovie(movie.properties.Titel.title[0].text.content)">
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
      loadingMovieDetails: state => state.movieDetails.detailsLoading,
      loadingMovieCredits: state => state.movieDetails.creditsLoading,
      loadingSearchMovie: state => state.movieDetails.searchLoading,
    })
  },
  mounted() {
    this.loadMovies()
  },
  methods: {
    ...mapActions({
      loadMovies: 'movies/loadMovies',
      loadMovieDetails: 'movieDetails/loadMovieDetails',
      loadMovieCredits: 'movieDetails/loadMovieCredits',
      searchMovie: 'movieDetails/searchMovie',
      selectMovie: 'movieDetails/selectMovie',
    })
  },
}
</script>

<style lang="scss">
body {
  font-family: "Helvetica Neue","sans-serif";
}
</style>
