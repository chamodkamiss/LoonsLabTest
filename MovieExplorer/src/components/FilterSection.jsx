import { useState, useEffect } from "react"
import {
  Box, FormControl, InputLabel, Select, MenuItem, Slider, 
  Typography, Button, Grid, Paper, IconButton, Collapse, 
  Tooltip, Chip, Divider
} from "@mui/material"
import { getGenres } from "../api/tmdbApi"
import FilterListIcon from '@mui/icons-material/FilterList'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import DateRangeIcon from '@mui/icons-material/DateRange'
import StarIcon from '@mui/icons-material/Star'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

const FilterSection = ({ onApplyFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [rating, setRating] = useState([0, 10])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres()
        setGenres(genreList)
      } catch (error) {
        console.error("Error fetching genres:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  const handleApplyFilters = () => {
    onApplyFilters({
      genre: selectedGenre,
      year: selectedYear,
      rating: rating[0] > 0 ? rating[0] : undefined,
    })
  }

  const handleResetFilters = () => {
    setSelectedGenre("")
    setSelectedYear("")
    setRating([0, 10])
    onApplyFilters({})
  }

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, // Increased padding
        mb: 3,
        borderRadius: 2,
        background: (theme) => `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 6,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3 // Increased margin
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TuneIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Discover Movies
          </Typography>
        </Box>
        <IconButton 
          onClick={() => setIsExpanded(!isExpanded)}
          size="medium"
          sx={{ 
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.04)',
            '&:hover': {
              backgroundColor: (theme) => 
                theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.08)',
            }
          }}
        >
          <FilterListIcon 
            sx={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }} 
          />
        </IconButton>
      </Box>

      {/* Add active filters display */}
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedGenre && (
          <Chip 
            label={`Genre: ${genres.find(g => g.id === selectedGenre)?.name}`}
            onDelete={() => setSelectedGenre("")}
            color="primary"
            variant="outlined"
          />
        )}
        {selectedYear && (
          <Chip 
            label={`Year: ${selectedYear}`}
            onDelete={() => setSelectedYear("")}
            color="primary"
            variant="outlined"
          />
        )}
        {(rating[0] > 0 || rating[1] < 10) && (
          <Chip 
            label={`Rating: ${rating[0]} - ${rating[1]}`}
            onDelete={() => setRating([0, 10])}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      <Collapse in={isExpanded}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl 
              fullWidth 
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '& fieldset': {
                    borderWidth: '2px',
                  }
                }
              }}
            >
              <InputLabel id="genre-label">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MovieFilterIcon fontSize="small" />
                  Genre
                </Box>
              </InputLabel>
              <Select
                labelId="genre-label"
                value={selectedGenre}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MovieFilterIcon fontSize="small" />
                    Genre
                  </Box>
                }
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <MenuItem value="">
                  <em>All Genres</em>
                </MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl 
              fullWidth
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '& fieldset': {
                    borderWidth: '2px',
                  }
                }
              }}
            >
              <InputLabel id="year-label">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DateRangeIcon fontSize="small" />
                  Year
                </Box>
              </InputLabel>
              <Select
                labelId="year-label"
                value={selectedYear}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DateRangeIcon fontSize="small" />
                    Year
                  </Box>
                }
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="">
                  <em>All Years</em>
                </MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              px: 3,
              py: 2,
              border: '2px solid',
              borderColor: 'divider',
              borderRadius: 1,
              '&:hover': {
                borderColor: 'primary.main',
              }
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                mb: 2,
                justifyContent: 'space-between'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon fontSize="small" color="primary" />
                  <Typography variant="subtitle1" fontWeight={500}>
                    Rating Range
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {rating[0]} - {rating[1]}
                </Typography>
              </Box>
              <Slider
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                step={0.5}
                marks={[
                  { value: 0, label: "0" },
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                ]}
                sx={{
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                    }
                  },
                  '& .MuiSlider-track': {
                    height: 6
                  },
                  '& .MuiSlider-rail': {
                    height: 6
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            {selectedGenre || selectedYear || rating[0] > 0 || rating[1] < 10 
              ? "Customize your movie preferences using the filters above"
              : "No filters applied - showing trending movies"}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Reset All Filters">
              <Button 
                variant="outlined" 
                onClick={handleResetFilters}
                startIcon={<RefreshIcon />}
                sx={{ 
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
              >
                Reset
              </Button>
            </Tooltip>
            <Tooltip title="Apply Filters">
              <Button 
                variant="contained" 
                onClick={handleApplyFilters}
                startIcon={<SearchIcon />}
                sx={{ 
                  fontWeight: 600,
                  px: 3
                }}
              >
                Apply Filters
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}

export default FilterSection
