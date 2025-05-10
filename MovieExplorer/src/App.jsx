import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import Home from './pages/Home'
import { MovieProvider } from './context/MovieContext'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Footer from './components/Footer'
import { Box } from '@mui/material'

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
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
        alternate: darkMode ? '#242424' : '#f0f0f0',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#b3b3b3' : '#666666',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1a1a1a' : '#1976d2',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      darkMode 
        ? '0 2px 4px 0 rgba(0,0,0,0.4)'
        : '0 2px 4px 0 rgba(0,0,0,0.1)',
      // ... add more shadow definitions if needed
    ],
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
      },
    },
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Add this for consistent baseline styles */}
      <MovieProvider>
        <BrowserRouter>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures footer sticks to bottom
          }}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Box sx={{ flex: 1 }}> {/* Flex: 1 pushes footer to bottom */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </MovieProvider>
    </ThemeProvider>
  )
}

export default App