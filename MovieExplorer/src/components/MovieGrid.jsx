import { Box, Grid, Typography, CircularProgress } from "@mui/material"
import FixedSizeMovieCard from "./MovieCard"

const UniformMovieGrid = ({ movies, loading, error, title }) => {
  // Height for empty states (loading, error, no results)
  const emptyStateHeight = "400px"
  
  if (loading && movies.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: emptyStateHeight,
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: emptyStateHeight,
          width: "100%",
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    )
  }

  if (movies.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: emptyStateHeight,
          width: "100%",
        }}
      >
        <Typography variant="h6">No movies found.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      {title && (
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid
            item
            key={movie.id}
            xs={6}
            sm={4}
            md={3}
            lg={3}
            sx={{
              // Fixed height for all grid items to ensure uniformity
              height: { 
                xs: "300px",   // Smaller height on mobile
                sm: "400px",   // Larger height on tablet/desktop
                md: "450px" 
            },
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                // This ensures all cards take exactly the same space
                display: "flex",
              }}
            >
              <FixedSizeMovieCard movie={movie} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {loading && movies.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={30} />
        </Box>
      )}
    </Box>
  )
}

export default UniformMovieGrid