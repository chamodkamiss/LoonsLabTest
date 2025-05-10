import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  InputBase, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import MovieIcon from "@mui/icons-material/Movie"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
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
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    maxWidth: "100%",
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: {
      xs: '0.875rem',
      sm: '1rem'
    },
    height: {
      xs: '2.5rem',
      sm: '3rem'
    },
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
    [theme.breakpoints.down("md")]: {
      width: "30ch",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}))

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, isAuthenticated, dispatch } = useContext(MovieContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(400))

  // Close drawer when switching to desktop view
  useEffect(() => {
    if (!isMobile && drawerOpen) {
      setDrawerOpen(false)
    }
  }, [isMobile, drawerOpen])
  
  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > theme.breakpoints.values.sm && showSearch) {
        setShowSearch(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [showSearch, theme.breakpoints.values.sm])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowSearch(false)
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
    setDrawerOpen(false)
    navigate('/')
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  const drawerItems = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/',
    },
    {
      text: 'Favorites',
      icon: <FavoriteIcon />,
      path: '/favorites',
    },
    ...(isAuthenticated 
      ? [{
          text: 'Logout',
          icon: <LogoutIcon />,
          onClick: handleLogout,
        }]
      : [{
          text: 'Login',
          icon: <AccountCircleIcon />,
          path: '/login',
        }]
    ),
  ]

  // Mobile search overlay component
  const MobileSearch = () => (
    <Box 
      sx={{ 
        position: 'fixed', // Changed from absolute to fixed for better overlay
        top: 0, 
        left: 0, 
        right: 0, 
        bgcolor: theme.palette.background.paper, 
        color: theme.palette.text.primary,
        zIndex: 1201,
        p: 1,
        display: 'flex',
        alignItems: 'center',
        boxShadow: 3, // Add shadow for elevation
        height: '56px', // Match AppBar height
      }}
    >
      <IconButton onClick={toggleSearch} color="inherit" edge="start" sx={{ ml: 0.5 }}>
        <CloseIcon />
      </IconButton>
      <Box 
        component="form" 
        onSubmit={handleSearch}
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          px: 0.5,
        }}
      >
        <Search sx={{ flexGrow: 1, m: 0 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            autoFocus
            placeholder="Search movies…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </Search>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
        <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            px: { xs: 0.5, sm: 2 },
            minHeight: { xs: '56px', sm: '64px' }, // Explicit height definition
            gap: { xs: 0.5, sm: 1 } // Add gap between elements
          }}>
          {/* Left section - Menu icon on mobile */}
          {isMobile ? (
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ ml: { xs: 0.5 } }} // Add consistent margin
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu" 
                component={Link} 
                to="/" 
              >
                <MovieIcon />
              </IconButton>

              <Typography 
                variant="h6" 
                noWrap 
                sx={{ 
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Movie Explorer
              </Typography>

              {!isMobile && (
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
              )}
            </Box>
          )}

          {/* Center section - Title on mobile, Search on larger screens */}
          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/" 
                sx={{ p: 0 }}
              >
                <MovieIcon sx={{ mr: 1 }} />
              </IconButton>
              <Typography 
                variant={isExtraSmall ? "body2" : "body1"} 
                noWrap 
                sx={{ 
                  fontWeight: 600,
                  maxWidth: isExtraSmall ? '100px' : '160px'
                }}
              >
                Movie Explorer
              </Typography>
            </Box>
          ) : (
            <Box 
              component="form" 
              onSubmit={handleSearch}
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                maxWidth: isTablet ? 400 : 800,
                width: "100%",
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
                />
              </Search>
            </Box>
          )}

          {/* Right section - Actions */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: { xs: 0.25, sm: 0.5 }, 
            mr: { xs: 0.5, sm: 0 }  // Add right margin on mobile
          }}>
            {isMobile && (
              <IconButton 
                color="inherit" 
                onClick={toggleSearch}
                aria-label="search"
                size={isExtraSmall ? "small" : "medium"}
              >
                <SearchIcon />
              </IconButton>
            )}

            {!isMobile && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/favorites"
                startIcon={<FavoriteIcon />}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Favorites
              </Button>
            )}
            
            {/* Always show favorites icon on mobile */}
            {isMobile && (
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/favorites"
                aria-label="favorites"
                size={isExtraSmall ? "small" : "medium"}
              >
                <FavoriteIcon />
              </IconButton>
            )}
            
            <IconButton
              color="inherit"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "light mode" : "dark mode"}
              size={isExtraSmall ? "small" : "medium"}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ 
                    padding: isExtraSmall ? 0.25 : 0.5,
                    border: '2px solid',
                    borderColor: 'primary.light'
                  }}
                  size={isExtraSmall ? "small" : "medium"}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    sx={{ 
                      width: isExtraSmall ? 24 : 32, 
                      height: isExtraSmall ? 24 : 32 
                    }}
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
              !isMobile && (
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  startIcon={<AccountCircleIcon />}
                >
                  Login
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile search overlay */}
      {isMobile && showSearch && <MobileSearch />}

      {/* Mobile navigation drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{
            width: 250,
            pt: 2,
            pb: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
          role="presentation"
        >
          <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Movie Explorer</Typography>
            </Box>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          
          {isAuthenticated && (
            <>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="subtitle1">{user.username}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </>
          )}
          
          <List>
            {drawerItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                component={item.path ? Link : 'div'}
                to={item.path}
                onClick={item.onClick || (() => setDrawerOpen(false))}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ mt: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleDarkMode} sx={{ mr: 1 }}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <Typography>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar