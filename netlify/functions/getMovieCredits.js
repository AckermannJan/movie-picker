const axios = require('axios')

exports.handler = async (event) => {
  const payload = JSON.parse(event.body)
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${payload.movieId}/credits?api_key=${process.env.TMDB_API_TOKEN}`)
  return {
    statusCode: 200,
    body: JSON.stringify(res.data),
  }
}
