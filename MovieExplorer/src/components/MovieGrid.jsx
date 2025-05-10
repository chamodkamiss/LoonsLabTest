import { Box, Grid, Typography, CircularProgress } from "@mui/material"
import FixedSizeMovieCard from "./MovieCard"

const UniformMovieGrid = ({ movies, loading, error, title }) => {
  const emptyStateHeight = "400px"
  
  if (loading && movies.length === 0) {
    return (
      <Box sx={{ height: emptyStateHeight, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ height: emptyStateHeight, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography color="error" variant="h6">{error}</Typography>
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

      <Grid 
        container 
        spacing={2}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',    // 2 columns on mobile
            sm: 'repeat(3, 1fr)',    // 3 columns on tablet
            md: 'repeat(4, 1fr)',    // 4 columns on desktop
            lg: 'repeat(5, 1fr)',    // 5 columns on large screens
          },
          gap: 2,
          alignItems: 'stretch'
        }}
      >
        {movies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              aspectRatio: '2/3',
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                zIndex: 1
              }
            }}
          >
            <FixedSizeMovieCard movie={movie} />
          </Box>
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