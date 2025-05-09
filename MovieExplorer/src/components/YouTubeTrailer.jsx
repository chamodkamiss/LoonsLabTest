import { Box, Typography } from "@mui/material"

const YouTubeTrailer = ({ videoKey, title }) => {
  if (!videoKey) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1">No trailer available</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h6" gutterBottom>
        Trailer
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9 Aspect Ratio
          overflow: "hidden",
          borderRadius: 1,
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          src={`https://www.youtube.com/embed/${videoKey}`}
          title={`${title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  )
}

export default YouTubeTrailer
