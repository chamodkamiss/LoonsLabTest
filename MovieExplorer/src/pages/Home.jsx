import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Divider } from "@mui/material";
import { MovieContext } from "../context/MovieContext";
import { getTrendingMovies, searchMovies, getMoviesByFilter } from "../api/tmdbApi";
import UniformMovieGrid from "../components/MovieGrid";
import FilterSection from "../components/FilterSection";
import LoadMoreButton from "../components/LoadMoreButton";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UniformHome = () => {
  const query = useQuery();
  const searchParam = query.get("search");

  const { dispatch, movies, trending, lastSearched, loading, error } = useContext(MovieContext);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});
  // Removed unused isFiltering state
  const [currentView, setCurrentView] = useState("trending"); // "trending", "search", "filter"

  // Reset page when search or filters change
  useEffect(() => {
    setPage(1);
    
    if (searchParam) {
      setCurrentView("search");
    } else if (Object.keys(filters).length > 0) {
      setCurrentView("filter");
    } else {
      setCurrentView("trending");
    }
  }, [searchParam, filters]);

  const fetchMovies = useCallback(
    async (searchQuery, pageNum = 1, resetMovies = true) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        let result;
        if (searchQuery) {
          result = await searchMovies(searchQuery, pageNum);
          if (pageNum === 1) {
            dispatch({ type: "SET_LAST_SEARCHED", payload: searchQuery });
          }
        } else if (Object.keys(filters).length > 0) {
          result = await getMoviesByFilter(filters, pageNum);
          // Removed setIsFiltering as isFiltering is no longer used
        } else {
          result = await getTrendingMovies(pageNum);
          // Removed setIsFiltering as isFiltering is no longer used
        }

        setTotalPages(result.total_pages);

        if (resetMovies) {
          dispatch({ type: "SET_MOVIES", payload: result.results });
        } else {
          dispatch({
            type: "SET_MOVIES",
            payload: [...movies, ...result.results],
          });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        dispatch({ type: "SET_ERROR", payload: error.toString() });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch, movies, filters]
  );

  const fetchTrending = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const result = await getTrendingMovies(1);
      dispatch({ type: "SET_TRENDING", payload: result.results });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    // Initial data fetch based on URL or state
    if (searchParam) {
      fetchMovies(searchParam, 1, true);
    } else if (Object.keys(filters).length > 0) {
      fetchMovies(null, 1, true);
    } else {
      fetchTrending();
    }
  }, [searchParam, filters, fetchMovies, fetchTrending]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(searchParam, nextPage, false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // We use a single grid component that changes content based on the current view
  // This prevents layout shifts between different views
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FilterSection onApplyFilters={handleApplyFilters} />

      <Box sx={{ position: "relative", width: "100%", minHeight: "60vh" }}>
        {currentView === "search" && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
              Search Results for "{searchParam}"
            </Typography>
            <UniformMovieGrid movies={movies} loading={loading} error={error} />
            {totalPages > 1 && page < totalPages && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <LoadMoreButton loading={loading} onClick={handleLoadMore} hasMore={page < totalPages} />
              </Box>
            )}
          </Box>
        )}

        {currentView === "filter" && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
              Filtered Movies
            </Typography>
            <UniformMovieGrid movies={movies} loading={loading} error={error} />
            {totalPages > 1 && page < totalPages && (
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <LoadMoreButton loading={loading} onClick={handleLoadMore} hasMore={page < totalPages} />
              </Box>
            )}
          </Box>
        )}

        {currentView === "trending" && (
          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
              Trending Movies
            </Typography>
            <UniformMovieGrid movies={trending} loading={loading} error={error} />

            {lastSearched && (
              <Box sx={{ mt: 6 }}>
                <Divider sx={{ my: 4 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Your Last Search: "{lastSearched}"
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We've saved your last search for convenience.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UniformHome;