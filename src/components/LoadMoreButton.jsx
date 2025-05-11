import { Button, Box, CircularProgress } from "@mui/material"

const LoadMoreButton = ({ loading, onClick, hasMore }) => {
  if (!hasMore) {
    return null
  }

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      my: 4,
      minHeight: '48px' // Prevent layout shift
    }}>
      <Button 
        variant="contained" 
        onClick={onClick} 
        disabled={loading} 
        sx={{ 
          minWidth: "200px",
          height: "48px",
          position: "relative",
          '&.Mui-disabled': {
            backgroundColor: 'action.disabledBackground',
          }
        }}
      >
        {loading ? (
          <CircularProgress 
            size={24} 
            sx={{ 
              color: "inherit",
              position: "absolute",
              left: "50%",
              marginLeft: "-12px"
            }} 
          />
        ) : (
          "Load More"
        )}
      </Button>
    </Box>
  )
}

export default LoadMoreButton