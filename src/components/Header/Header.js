import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Logout from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../img/logo.png'
import { PAGES, accountSlotProps, navSlotProps } from './constants/constants';
import './css/header.css'
import { ListItemIcon } from '@mui/material';


function Header(params) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth='lg' >
      <AppBar color='transparent' position="static" sx={{ boxShadow: 'none' }} >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
            <img src={logo} alt='logo' className='logo' />
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: 'white' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                slotProps={navSlotProps}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {PAGES.map((page) => (
                  <MenuItem fullWidth key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly', px: 2 }}>
              {PAGES.map((page) => (
                <Button
                  fullWidth
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ color: 'white', display: 'block', textTransform: 'none', height: '100%' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0, order: 2 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!'if user logged in' ?
                  <Avatar alt="user.name" src={'user.avatar'} /> :
                  <>
                    <PersonIcon sx={{ color: 'white', fontSize: { xs: '1.5rem', md: '2rem' } }} />
                    <Typography sx={{ color: 'white', fontSize: '14px', ml: '5px' }} >Sign In</Typography>
                  </>
                }
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                slotProps={accountSlotProps}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Avatar /> My account
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon >
                    <Logout sx={{ color: 'white' }} fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container >
  );
}

export default Header