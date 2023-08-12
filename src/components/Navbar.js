import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
const Navbar = () => {
  return (

    <Box sx={{display:'flex', flexDirection:'column', flex:1}} >
      {/* <AppBar/> */}
      <div>
        <Outlet/>
      </div>
    </Box>
  );
}

export default Navbar;