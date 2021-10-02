const axios = require('axios')

exports.handler = async (event) => {
  const payload = JSON.parse(event.body)
  const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_TOKEN}&language=en-US&query=${payload.searchString}&page=1&include_adult=true`)
  return {
    statusCode: 200,
    body: JSON.stringify(res.data),
  }
}
