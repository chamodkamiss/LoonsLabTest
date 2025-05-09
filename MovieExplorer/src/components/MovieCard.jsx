import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'

const MovieCard = (movie) => {
  return (
    <Card sx={{height: '100%', display: 'flex', flexDirection: 'column',transition: 'transform 0.15s ease-in-out', '&:hover': { transform: 'scale(1.05)' }}}>
      <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none', color: 'inherit'}}/>
      <CardMedia component="img" image={movie.poster} height='300' alt={movie.title} />
      <CardContent sx={{flexGrow:1}}>
        <Typography>
            {movie.title}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',mb: 1}}>
            <Typography variant='body2' color='text.secondary'>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <StarIcon sx={{ color: 'gold' , mr:0.5, fontSize: '1rem' }}/>
                <Typography variant='body2' color='text.secondary'>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </Typography>
            </Box>
        </Box>  
      </CardContent>

    </Card>
  )
}

export default MovieCard
