import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Box, Avatar, Menu, MenuItem, Divider } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import MovieIcon from "@mui/icons-material/Movie"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import { MovieContext } from "../context/MovieContext"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  maxWidth: "800px", // Increased max-width
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // Make input take full width
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch", // Increased width for larger screens
    },
  },
}))

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, isAuthenticated, dispatch } = useContext(MovieContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" })
    handleMenuClose()
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            component={Link} 
            to="/" 
            sx={{ mr: 1 }}
          >
            <MovieIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontWeight: 600
            }}
          >
            Movie Explorer
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              textTransform: 'none',
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Home
          </Button>
        </Box>

        {/* Center section - Search */}
        <Box 
          component="form" 
          onSubmit={handleSearch}
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            maxWidth: 800, // Increased max-width
            width: "100%", // Take full available width
            mx: 'auto'
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movies…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: "100%", // Take full width of parent
              }}
            />
          </Search>
        </Box>

        {/* Right section - Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/favorites"
            startIcon={<FavoriteIcon />}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            Favorites
          </Button>
          
          <IconButton
            color="inherit"
            component={Link}
            to="/favorites"
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <FavoriteIcon />
          </IconButton>

          <IconButton 
            color="inherit" 
            onClick={toggleDarkMode} 
            aria-label={darkMode ? "light mode" : "dark mode"}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ 
                  ml: 2,
                  padding: 0.5,
                  border: '2px solid',
                  borderColor: 'primary.light' 
                }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem sx={{ pointerEvents: 'none' }}>
                  <Box sx={{ py: 1 }}>
                    <Typography variant="subtitle1">{user.username}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              startIcon={<AccountCircleIcon />}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
