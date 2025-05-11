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
        main: '#2196f3', // Modern blue
        light: '#64b5f6',
        dark: '#1976d2',
      },
      secondary: {
        main: '#f50057', // Modern pink
        light: '#ff4081',
        dark: '#c51162',
      },
      background: {
        default: darkMode ? '#0a1929' : '#f8fafc', // Deeper dark, lighter light
        paper: darkMode ? '#1a2027' : '#ffffff',
        alternate: darkMode ? '#132f4c' : '#f1f5f9',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#0f172a',
        secondary: darkMode ? '#94a3b8' : '#475569',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease',
            scrollBehavior: 'smooth',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s ease',
          },
          elevation1: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          },
        },
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