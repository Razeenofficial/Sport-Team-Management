import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SportsIcon from '@mui/icons-material/Sports';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CreateIcon from '@mui/icons-material/Create';

import './Button.css'

function NavigationDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const list = (
    <List>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link to="/add-sports" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <SportsIcon />
          </ListItemIcon>
          <ListItemText primary="Add Sports" />
        </ListItem>
      </Link>
      <Link to="/add-player" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Add Player" />
        </ListItem>
      </Link>
      <Link to="/add-coach" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Add Coach" />
        </ListItem>
      </Link>
      <Link to="/create-team" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Create Team" />
        </ListItem>
      </Link>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: '#040D12' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color='black'
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon 
            sx={{ fontSize: 40 , color: 'white'}}/>
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Sports Team Management
          </Typography>
          <Link to="/">
            <button className="hbutton">
              <HomeIcon />
            </button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        anchor="left"
        variant="temporary"
        backgroundColor='#F8FFDB'
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ color: '#F8FFDB' }}
      >
        {list}
      </Drawer>
    </Box>
  );
}

export default NavigationDrawer;
