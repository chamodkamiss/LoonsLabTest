import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Grid, Typography, Box, Chip, Button, Paper, CircularProgress, Divider } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import StarIcon from "@mui/icons-material/Star"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { MovieContext } from "../context/MovieContext"
import { getMovieDetails } from "../api/tmdbApi"
import YouTubeTrailer from "../components/YouTubeTrailer"

const MovieDetails = () => {
  const { id } = useParams()
  const { favorites, dispatch } = useContext(MovieContext)

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isFavorite = favorites.some((fav) => fav.id === Number.parseInt(id))

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const data = await getMovieDetails(id)
        setMovie(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: Number.parseInt(id) })
    } else if (movie) {
      dispatch({ type: "ADD_FAVORITE", payload: movie })
    }
  }

  if (loading) {
    return (
      <Container sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error" variant="h5">
          Error: {error}
        </Typography>
      </Container>
    )
  }

  if (!movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Movie not found</Typography>
      </Container>
    )
  }

  // Find trailer if available
  const trailer = movie.videos?.results.find((video) => video.type === "Trailer" && video.site === "YouTube")

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            height: "400px",
            width: "100%",
            position: "relative",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            p: 4,
          }}
        >
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item xs={12} sm={4} md={3}>
              <Box
                component="img"
                src={
                  movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                    : "/placeholder-poster.jpg"
                }
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "350px",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: (theme) => `0 8px 24px ${
                    theme.palette.mode === 'dark' 
                      ? 'rgba(0,0,0,0.5)' 
                      : 'rgba(0,0,0,0.2)'
                  }`,
                  position: "relative",
                  zIndex: 1,
                  display: "block",
                  margin: "0 auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                  "@media (max-width: 600px)": {
                    maxWidth: "280px",
                    marginBottom: 2
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography 
                variant="h3" 
                component="h1" 
                color="white" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                  wordBreak: 'break-word',
                  lineHeight: 1.2
                }}
              >
                {movie.title} {movie.release_date && `(${new Date(movie.release_date).getFullYear()})`}
              </Typography>

              <Box sx={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: { xs: 0.5, sm: 1 }, 
                mb: { xs: 1.5, sm: 2 } 
              }}>
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{ 
                      bgcolor: "rgba(255,255,255,0.2)", 
                      color: "white",
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: '24px', sm: '32px' }
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 1.5, sm: 2 },
                mb: { xs: 1.5, sm: 2 }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  <Typography 
                    variant="h6" 
                    color="white" 
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <StarIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                    {movie.vote_average.toFixed(1)}/10
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="white" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                    {movie.runtime} min
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color={isFavorite ? "secondary" : "primary"}
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={handleToggleFavorite}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 2, sm: 3 },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Trailer Section - Moved up and made larger */}
          {trailer?.key ? (
            <Box sx={{ mb: 4, mt: 2 }}>
                <YouTubeTrailer
                videoKey={trailer.key}
                title={movie.title}
                showTitle={true}
                />
            </Box>
            ) : (
            <Box 
                sx={{ 
                mb: 4,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                textAlign: 'center'
                }}
            >
                <Typography variant="body1" color="text.secondary">
                No trailer available
                </Typography>
            </Box>
            )}

            <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Release Date</Typography>
                <Typography variant="body2">
                  {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "N/A"}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Original Language</Typography>
                <Typography variant="body2">{movie.original_language?.toUpperCase() || "N/A"}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Budget</Typography>
                <Typography variant="body2">{movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Revenue</Typography>
                <Typography variant="body2">{movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}</Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            Cast
          </Typography>
          <Grid container spacing={2}>
            {movie.credits?.cast.slice(0, 8).map((person) => (
              <Grid item key={person.id} xs={6} sm={4} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                        : "/placeholder-person.jpg"
                    }
                    alt={person.name}
                    sx={{
                      width: "100%",
                      borderRadius: "50%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      mb: 1,
                    }}
                  />
                  <Typography variant="subtitle2" noWrap>
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {person.character}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default MovieDetails
