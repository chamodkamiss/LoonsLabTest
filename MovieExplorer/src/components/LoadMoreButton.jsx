import { Button, Box, CircularProgress } from "@mui/material"

const LoadMoreButton = ({ loading, onClick, hasMore }) => {
  if (!hasMore) {
    return null
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <Button variant="contained" onClick={onClick} disabled={loading} sx={{ minWidth: "200px" }}>
        {loading ? <CircularProgress size={24} /> : "Load More"}
      </Button>
    </Box>
  )
}

export default LoadMoreButton
