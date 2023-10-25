import React, { useState } from 'react';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from 'styles/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileImage from "../../assets/profile.jpg";
import { useTheme } from '@emotion/react';
import { Box, AppBar, Button, IconButton, InputBase, Toolbar, Typography, Menu, MenuItem } from '@mui/material';


const Navbar =({user, isSidebarOpen, setIsSidebarOpen}) =>{
  const dispatch=useDispatch();
  const theme = useTheme();
  const [anchorEl, setAchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAchorEl(event.currentTarget);
  const handleClose = () => setAchorEl(null);


  return <AppBar sx={{position : "static", background : "None", boxShadow : "None"}}>
    <Toolbar sx={{justifyContent : "space-between"}}>
      {/* Left side */}
      <FlexBetween>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon />
        </IconButton>
        <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius={'9px'} gap={'3rem'} p={"0.1rem 1.5rem"}>
          <InputBase placeholder='Search...' />
          <IconButton>
            <Search />
          </IconButton>
          </FlexBetween>
      </FlexBetween> 

      {/* Right side */}
      <FlexBetween gap={'1.5rem'}>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlined sx={{ fontSize : "25px"}} />) : (<LightModeOutlined sx={{ fontSize : "25px"}} />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlined sx={{ fontSize : "25px"}} />
        </IconButton>

        <FlexBetween >
          <Button onClick={handleClick} sx={{
            display : "flex", justifyContent : "space-between" ,
            alignItems : "center",
            textTransform : "none",
            gap : "1rem",
          }}>
            <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user.name}
                  </Typography>
                  {/* <Typography
                    fontWeight="bold"
                    fontSize="0.6rem"
                    sx={{
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user.occupation}
                  </Typography> */}
                  </Box>
                  <ArrowDropDownOutlined
                  sx={{ color : theme.palette.secondary[200], fontSize:"25px"}}></ArrowDropDownOutlined>
          </Button>
          <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical : "bottom", horizontal : "center"}}>
            <MenuItem onClick={handleClose}>
              Log Out
            </MenuItem>
          </Menu>
        </FlexBetween>
      </FlexBetween>
    </Toolbar>

  </AppBar>
}


export default Navbar