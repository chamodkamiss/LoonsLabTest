import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/" sx={{ mr: 2 }}>
                    <MovieIcon/>
                </IconButton>    

                <Typography variant="h6" noWrap component={Link} to="/" sx={{
                    flexGrow: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                    display:{xs: 'none', sm: 'block'},
                    }}>
                    Movie Explorer
                </Typography>    
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;