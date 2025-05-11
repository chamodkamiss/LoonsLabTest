import { useContext } from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { MovieContext } from "../context/MovieContext"
import MovieGrid from "../components/MovieGrid"
import { Link } from "react-router-dom"

const Favorites = () => {
  const { favorites } = useContext(MovieContext)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Favorite Movies
      </Typography>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} loading={false} error={null} />
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            You haven't added any favorite movies yet.
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Explore Movies
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default Favorites
