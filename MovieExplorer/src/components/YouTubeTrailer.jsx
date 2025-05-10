import { Box, Typography, Paper } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState } from "react"

const YouTubeTrailer = ({ videoKey, title, showTitle = true }) => {
  const [isHovered, setIsHovered] = useState(false)

  if (!videoKey) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          my: 2,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          No trailer available
        </Typography>
      </Paper>
    )
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
        <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mb: 2,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <PlayArrowIcon sx={{ fontSize: 28 }} />
        Official Trailer
      </Typography>

      <Paper
        elevation={8}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          }
        }}
      >
        {/* Trailer Thumbnail with Play Button Overlay */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            bgcolor: 'black',
          }}
        >
          {/* YouTube Player */}
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
              zIndex: 1
            }}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Play Button Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: isHovered ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
              transition: 'background-color 0.3s ease',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 40, color: '#000' }} />
            </Box>
          </Box>
        </Box>

        {/* Title Bar */}
        {showTitle && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              p: 2,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
              zIndex: 2
            }}
          >
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default YouTubeTrailer