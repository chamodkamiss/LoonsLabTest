import { Box, Container, Typography, Link, IconButton, Divider, Button } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import MovieIcon from '@mui/icons-material/Movie'
import { Link as RouterLink } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor: (theme) => 
          theme.palette.mode === 'dark' 
            ? theme.palette.background.paper
            : theme.palette.primary.main,
        color: (theme) => 
          theme.palette.mode === 'dark' 
            ? theme.palette.text.primary 
            : '#fff',
        borderTop: (theme) =>
          `1px solid ${
            theme.palette.mode === 'dark'
              ? theme.palette.divider
              : 'rgba(255, 255, 255, 0.12)'
          }`,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            mb: 4,
            gap: 4
          }}
        >
          {/* Brand Section */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MovieIcon sx={{ 
                fontSize: 40, 
                mr: 1,
                color: (theme) => theme.palette.mode === 'dark' 
                  ? theme.palette.primary.main 
                  : 'inherit'
              }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Movie Explorer
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ 
              maxWidth: 300, 
              mb: 2, 
              opacity: 0.9,
              color: (theme) => 
                theme.palette.mode === 'dark' 
                  ? theme.palette.text.secondary 
                  : 'rgba(255, 255, 255, 0.8)'
            }}>
              Your ultimate destination for discovering cinematic gems, tracking your watchlist, and exploring the world of movies.
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: { xs: 4, md: 8 } }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/"
                  sx={{ 
                    justifyContent: 'flex-start',
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.text.primary 
                        : '#fff',
                    '&:hover': { 
                      opacity: 0.8,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Home
                </Button>
                <Button
                  component={RouterLink}
                  to="/favorites"
                  sx={{ 
                    justifyContent: 'flex-start',
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.text.primary 
                        : '#fff',
                    '&:hover': { 
                      opacity: 0.8,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Favorites
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ 
                    fontSize: 20,
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.primary.main 
                        : 'inherit'
                  }} />
                  <Typography variant="body2" sx={{ 
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.text.primary 
                        : '#fff',
                  }}>
                    support@movieexplorer.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ 
                    fontSize: 20,
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.primary.main 
                        : 'inherit'
                  }} />
                  <Typography variant="body2" sx={{ 
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.text.primary 
                        : '#fff',
                  }}>
                    +94 11 234 5678
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ 
                    fontSize: 20,
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.primary.main 
                        : 'inherit'
                  }} />
                  <Typography variant="body2" sx={{ 
                    color: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? theme.palette.text.primary 
                        : '#fff',
                  }}>
                    Colombo, Sri Lanka
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ 
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.divider
              : 'rgba(255, 255, 255, 0.12)',
          my: 3 
        }} />

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ 
            opacity: 0.9,
            color: (theme) => 
              theme.palette.mode === 'dark' 
                ? theme.palette.text.secondary 
                : 'rgba(255, 255, 255, 0.8)'
          }}>
            © {currentYear} Movie Explorer. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {[
              { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/chamodkamiss' },
              { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/chamodkamiss/' },
              { icon: <TwitterIcon />, label: 'Twitter', url: 'https://x.com/ChamodKamiss' }
            ].map((social) => (
              <IconButton
                key={social.label}
                aria-label={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: (theme) => 
                    theme.palette.mode === 'dark' 
                      ? theme.palette.text.primary 
                      : '#fff',
                  '&:hover': { 
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
