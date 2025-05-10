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
  
    return (
      <Card
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            '& .movie-info': {
              opacity: 1,
              transform: 'translateY(0)',
            },
            '& .movie-backdrop': {
              transform: 'scale(1.05)',
            }
          }
        }}
      >
        <Box
          className="movie-backdrop"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-poster.jpg"
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
          }}
        />
  
        {/* Overlay with movie info */}
        <Box
          className="movie-info"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
            color: 'white',
            p: 2,
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Box>
            <Typography 
              variant="h6" 
              component={Link}
              to={`/movie/${movie.id}`}
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontWeight: 'bold',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {movie.title}
            </Typography>
            
            <Typography variant="body2" sx={{ mt: 1 }}>
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            </Typography>
          </Box>
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: 'gold', mr: 0.5 }} />
              <Typography>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </Typography>
            </Box>
  
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isFavorite) {
                  dispatch({ type: "REMOVE_FAVORITE", payload: movie.id });
                } else {
                  dispatch({ type: "ADD_FAVORITE", payload: movie });
                }
              }}
              sx={{ color: 'white' }}
            >
              {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Box>
      </Card>
    )
}

export default FixedSizeMovieCard