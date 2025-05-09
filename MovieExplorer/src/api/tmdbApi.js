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