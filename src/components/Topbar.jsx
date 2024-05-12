import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Topbar.css'; // Import the CSS file

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar className="navbar">
                <div style = {{flexGrow: 1}}>
                <img src = "https://assets-global.website-files.com/6554201fbcd6022f45ae631a/6557f85958184a76d79b5ff2_Narrative.svg" alt = 'logo'/>
                </div>
                <IconButton color="black">
                    <AccountCircleIcon />
                </IconButton>
                <IconButton color="black">
                    <NotificationsIcon />
                </IconButton>
                <IconButton color="black">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
