import { useState, useEffect } from "react"
import { Box, FormControl, InputLabel, Select, MenuItem, Slider, Typography, Button, Grid, Paper } from "@mui/material"
import { getGenres } from "../api/tmdbApi"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

const FilterSection = ({ onApplyFilters }) => {
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
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Movies
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth disabled={loading}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={selectedGenre}
              label="Genre"
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={selectedYear}
              label="Year"
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
        <Grid item xs={12} sm={4}>
          <Box sx={{ px: 2 }}>
            <Typography id="rating-slider" gutterBottom>
              Rating: {rating[0]} - {rating[1]}
            </Typography>
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
              aria-labelledby="rating-slider"
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button variant="contained" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Box>
    </Paper>
  )
}

export default FilterSection
