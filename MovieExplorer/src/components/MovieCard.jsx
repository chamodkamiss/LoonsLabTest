import { useContext } from "react"
import { Link } from "react-router-dom"
import { Box, Card, Typography, IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import StarIcon from "@mui/icons-material/Star"
import { MovieContext } from "../context/MovieContext"

const FixedSizeMovieCard = ({ movie }) => {
  const { favorites, dispatch } = useContext(MovieContext)
  const isFavorite = favorites.some((fav) => fav.id === movie.id)

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie.id })
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie })
    }
  }

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: {xs: 1, sm: 2},
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Fixed aspect ratio poster container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: {xs:"140%", sm:"150%"}, 
          overflow: "hidden",
        }}
      >
        {/* Poster image background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-poster.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        
        {/* Link overlay covering the entire poster */}
        <Link
          to={`/movie/${movie.id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            textDecoration: "none",
            zIndex: 1,
          }}
          aria-label={movie.title}
        />
        
        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: { xs: "8px", sm: "12px" },
            padding: { xs: "2px 6px", sm: "3px 8px" },
            display: "flex",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <StarIcon sx={{ color: "#FFD700", fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </Typography>
        </Box>
      </Box>

      {/* Fixed height content area */}
      <Box
        sx={{
            p: { xs: 1.5, sm: 2 },
            height: { xs: "100px", sm: "120px" }, // Fixed height for content area
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Movie title with fixed height and ellipsis */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.2,
            height: "2.4em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 1,
          }}
        >
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {movie.title}
          </Link>
        </Typography>

        {/* Year and favorite button row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto", // Push to bottom of content area
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
          </Typography>
          
          <IconButton
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={handleToggleFavorite}
            sx={{
              padding: 0.5,
              color: isFavorite ? "error.main" : "action.disabled",
            }}
            size="small"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default FixedSizeMovieCard