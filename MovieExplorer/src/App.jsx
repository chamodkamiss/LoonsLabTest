import React, { useState,useEffect } from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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
      <BrowserRouter>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App