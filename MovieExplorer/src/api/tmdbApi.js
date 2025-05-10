import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
})

// Handle API errors
tmdbApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.status_message || 'An error occurred. Please try again later.';
        return Promise.reject(errorMessage);
    }
);

export const getTrendingMovies = async (page = 1) => {
    try {
      const response = await tmdbApi.get("/trending/movie/week", {
        params: { page },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching trending movies:", error)
      throw error
    }
}
  
export const searchMovies = async (query, page = 1) => {
    try {
      const response = await tmdbApi.get("/search/movie", {
        params: { query, page },
      })
      return response.data
    } catch (error) {
      console.error("Error searching movies:", error)
      throw error
    }
}
  
export const getMovieDetails = async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`, {
        params: {
          append_to_response: "videos,credits",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching movie details:", error)
      throw error
    }
}
  
export const getMoviesByFilter = async (filters, page = 1) => {
    const { year, genre, rating } = filters
  
    try {
      const response = await tmdbApi.get("/discover/movie", {
        params: {
          page,
          primary_release_year: year || undefined,
          with_genres: genre || undefined,
          "vote_average.gte": rating || undefined,
          sort_by: "popularity.desc",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching movies by filter:", error)
      throw error
    }
}
  
export const getGenres = async () => {
    try {
      const response = await tmdbApi.get("/genre/movie/list")
      return response.data.genres
    } catch (error) {
      console.error("Error fetching genres:", error)
      throw error   
    }
}
  
