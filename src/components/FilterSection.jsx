import { useState, useEffect } from "react"
import {
  Box, FormControl, InputLabel, Select, MenuItem, Slider, 
  Typography, Button, Grid, Paper, IconButton, Collapse, 
  Tooltip, Chip, Divider, Avatar, Card, CardContent, 
  CardHeader, Stack, alpha
} from "@mui/material"
import { getGenres } from "../api/tmdbApi"
import FilterListIcon from '@mui/icons-material/FilterList'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import DateRangeIcon from '@mui/icons-material/DateRange'
import StarIcon from '@mui/icons-material/Star'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import TheatersIcon from '@mui/icons-material/Theaters'

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

const FilterSection = ({ onApplyFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false)
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

  const hasActiveFilters = selectedGenre || selectedYear || rating[0] > 0 || rating[1] < 10

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 0,
        mb: 3,
        borderRadius: 2,
        overflow: 'hidden',
        background: (theme) => theme.palette.background.paper,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 6,
        }
      }}
    >
      {/* Colorful top border */}
      <Box 
        sx={{
          height: 4,
          background: (theme) => 
            theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #5c6bc0 0%, #3949ab 50%, #283593 100%)'
              : 'linear-gradient(90deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)'
        }}
      />

      {/* Header with icon and expand button */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.05)
      }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            cursor: 'pointer',
            '&:hover': {
              '& .filter-title': {
                color: 'primary.main'
              }
            }
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40
            }}
          >
            <TheatersIcon />
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              className="filter-title"
              sx={{ 
                fontWeight: 600, 
                lineHeight: 1.2,
                transition: 'color 0.2s'
              }}
            >
              Discover Movies
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {!isExpanded 
                ? 'Click to expand filter options' 
                : hasActiveFilters 
                  ? 'Custom filters applied' 
                  : 'Find your perfect movie match'
              }
            </Typography>
          </Box>
        </Box>
        
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outlined"
          color="primary"
          startIcon={
            <FilterListIcon 
              sx={{ 
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}
            />
          }
          sx={{
            borderRadius: 2,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }
          }}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>

      {/* Active filters display */}
      {hasActiveFilters && (
        <Box sx={{ 
          px: 3, 
          py: 2, 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="subtitle2" sx={{ mr: 1, alignSelf: 'center' }}>
            Active Filters:
          </Typography>
          
          {selectedGenre && (
            <Chip 
              avatar={
                <Avatar sx={{ bgcolor: 'primary.dark' }}>
                  <MovieFilterIcon fontSize="small" />
                </Avatar>
              }
              label={genres.find(g => g.id === selectedGenre)?.name}
              onDelete={() => setSelectedGenre("")}
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          )}
          
          {selectedYear && (
            <Chip 
              avatar={
                <Avatar sx={{ bgcolor: 'secondary.dark' }}>
                  <DateRangeIcon fontSize="small" />
                </Avatar>
              }
              label={selectedYear}
              onDelete={() => setSelectedYear("")}
              color="secondary"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          )}
          
          {(rating[0] > 0 || rating[1] < 10) && (
            <Chip 
              avatar={
                <Avatar sx={{ bgcolor: 'success.dark' }}>
                  <StarIcon fontSize="small" />
                </Avatar>
              }
              label={`${rating[0]} - ${rating[1]}`}
              onDelete={() => setRating([0, 10])}
              color="success"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          )}

          <Box sx={{ ml: 'auto' }}>
            <Button 
              variant="text" 
              color="inherit" 
              size="small" 
              onClick={handleResetFilters}
              startIcon={<RefreshIcon fontSize="small" />}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      )}

      {/* Active filters indicator when collapsed */}
      {!isExpanded && hasActiveFilters && (
        <Box sx={{ 
          mt: 1, 
          mx: 3,
          mb: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
          border: '1px dashed',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">
              Filters applied:
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {selectedGenre && (
                <Chip 
                  size="small"
                  label={genres.find(g => g.id === selectedGenre)?.name}
                  color="primary"
                />
              )}
              {selectedYear && (
                <Chip 
                  size="small"
                  label={selectedYear}
                  color="secondary"
                />
              )}
              {(rating[0] > 0 || rating[1] < 10) && (
                <Chip 
                  size="small"
                  label={`${rating[0]}-${rating[1]}★`}
                  color="success"
                />
              )}
            </Box>
          </Box>
          <Button 
            size="small" 
            onClick={handleResetFilters}
            color="inherit"
          >
            Clear
          </Button>
        </Box>
      )}

      <Collapse in={isExpanded}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Genre Card */}
            <Grid item xs={12} md={4}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <MovieFilterIcon />
                    </Avatar>
                  }
                  title="Genre"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                  sx={{ pb: 1 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <FormControl 
                    fullWidth 
                    disabled={loading}
                    size="medium"
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
                    <InputLabel id="genre-label">Select Genre</InputLabel>
                    <Select
                      labelId="genre-label"
                      value={selectedGenre}
                      label="Select Genre"
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300
                          }
                        }
                      }}
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
                </CardContent>
              </Card>
            </Grid>

            {/* Year Card */}
            <Grid item xs={12} md={4}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <DateRangeIcon />
                    </Avatar>
                  }
                  title="Release Year"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                  sx={{ pb: 1 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <FormControl 
                    fullWidth
                    size="medium"
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'secondary.main',
                        },
                        '& fieldset': {
                          borderWidth: '2px',
                        }
                      }
                    }}
                  >
                    <InputLabel id="year-label">Select Year</InputLabel>
                    <Select
                      labelId="year-label"
                      value={selectedYear}
                      label="Select Year"
                      onChange={(e) => setSelectedYear(e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300
                          }
                        }
                      }}
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
                </CardContent>
              </Card>
            </Grid>

            {/* Rating Card */}
            <Grid item xs={12} md={4}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <StarIcon />
                    </Avatar>
                  }
                  title="Rating"
                  titleTypographyProps={{ variant: 'h6', fontWeight: 500 }}
                  action={
                    <Typography variant="body1" sx={{ fontWeight: 'bold', p: 1 }}>
                      {rating[0]}-{rating[1]}
                    </Typography>
                  }
                  sx={{ pb: 1 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ px: 1 }}>
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
                        color: 'success.main',
                        '& .MuiSlider-thumb': {
                          width: 16,
                          height: 16,
                          '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0 0 0 8px rgba(76, 175, 80, 0.16)',
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
                    
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3} mb={1}>
                      <Typography variant="caption" color="text.secondary">Poor</Typography>
                      <Box sx={{ display: 'flex' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon 
                            key={star} 
                            sx={{ 
                              fontSize: '16px',
                              color: star <= rating[1] / 2 && star >= rating[0] / 2 ? 'gold' : 'text.disabled'
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="caption" color="text.secondary">Great</Typography>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filter actions */}
          <Box 
            sx={{ 
              mt: 4,
              pt: 3, 
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
              {hasActiveFilters 
                ? "Find movies that match your preferences using the filters above"
                : "Select filters to discover specific movies or browse all trending titles"}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleResetFilters}
                startIcon={<RefreshIcon />}
                color="inherit"
                sx={{ 
                  borderWidth: '1px',
                  borderRadius: 2,
                  px: 2
                }}
              >
                Reset
              </Button>
              
              <Button 
                variant="contained" 
                onClick={handleApplyFilters}
                startIcon={<SearchIcon />}
                sx={{ 
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  background: (theme) => 
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #5c6bc0 30%, #3949ab 90%)'
                      : 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}

export default FilterSection
