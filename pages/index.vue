<template>
  <main>
    <h1>Movies</h1>
    {{ loadingGenre ? 'Getting genre' : null }}<br>
    {{ loadingMovies ? 'Getting Movies' : null }}
    <ul>
      <li v-for="genre in genres" :key="genre.id">
        {{ genre.name }}
      </li>
    </ul>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
          {{ movie.properties.Titel.title[0].text.content }}
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data: () => ({
    movies: [],
    genres: [],
    loadingMovies: false,
    loadingGenre: false,
  }),
  methods: {
    async getAllMovies(nextCursor) {
      this.loadingMovies = true
      const startCursor = nextCursor || undefined
      const response = await fetch('/.netlify/functions/getDatabase', {
        method: 'POST',
        body: JSON.stringify({
          startCursor,
        }),
      }).then((res) => res.json())
      if(this.movies.length > 0) {
        this.movies = [...this.movies, ...response.results]
      } else {
        this.movies = response.results
      }
      if (response.has_more) {
        await this.getAllMovies(response.next_cursor)
      }
      this.loadingMovies = false
    },
    async getDatabaseFromat () {
      this.loadingGenre = true
      const response = await fetch('/.netlify/functions/getDatabaseFormat').then((res) => res.json())
      this.loadingGenre = false
      this.genres = response.properties.Genre.select.options.map(option => option)
    }
  },
  mounted() {
    this.getDatabaseFromat()
    this.getAllMovies()
  },
}
</script>
