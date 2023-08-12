import React from 'react';
import {
  Button,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

function Sidebar() {
  const username = "Usuario"; // Puedes obtener esto de donde lo necesites

  return (
    <Box
      sx={{
        width: '80%',
        padding: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <Avatar alt={username} sx={{ width: 60, height: 60 }} />
        <Typography variant="h6">{username}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'flex-start',
        }}
      >
      <Button startIcon={<HomeIcon sx={{width: '35px', height: '35px'}}/>} style={{ justifyContent: 'flex-start',textTransform:'capitalize' }} fullWidth >
        Inicio
        </Button>
        <Button startIcon={<SettingsIcon sx={{width: '35px', height: '35px'}} />} style={{ justifyContent: 'flex-start', textTransform:'capitalize' }} fullWidth>
        Configuración
        </Button>
        <Button startIcon={<HelpIcon sx={{width: '35px', height: '35px'}} />} style={{ justifyContent: 'flex-start', textTransform:'capitalize' }} fullWidth>
        Ayuda
        </Button>

      </Box>
    </Box>
  );
}

export default Sidebar;
