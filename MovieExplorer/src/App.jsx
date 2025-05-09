import React, { useState,useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Home from './pages/Home'
import { MovieProvider } from './context/MovieContext'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
    },
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <ThemeProvider theme={theme}>
      <MovieProvider>
        <BrowserRouter>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </ThemeProvider>
  )
}

export default App