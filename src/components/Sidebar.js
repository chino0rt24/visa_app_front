import React, { useEffect, useState } from 'react';
import {
  Button,
  Avatar,
  Typography,
  Box
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  return (
    <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        flex: 2,
        backgroundColor: 'primary.main',
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        borderBottomRightRadius: '40% 25%',
        borderBottomLeftRadius: '40% 25%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

      }}
    >
        <Avatar src={user?.picture} sx={{ width: 60, height: 60, marginBottom: '10px' }} />
       <Typography variant="h6" color={'white'} lineHeight={1.2}>{user?.name}</Typography>
    </Box>
    <Box
      sx={{
        flex: 6,
        backgroundColor: 'white',
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
      }}
    >
           <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'flex-start',
            marginTop: '20px',
            width: '100%'
          }}
        >
          <Button startIcon={<HomeIcon sx={{ width: '35px', height: '35px' }} />} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }} fullWidth>
            Inicio
          </Button>
          <Button startIcon={<SettingsIcon sx={{ width: '35px', height: '35px' }} />} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }} fullWidth>
            Configuración
          </Button>
          <Button startIcon={<HelpIcon sx={{ width: '35px', height: '35px' }} />} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }} fullWidth>
            Ayuda
          </Button>
        </Box>
        <Box xs={8}mx={'auto'} sx={{ position:'absolute', bottom:100}} >
          <Button
          startIcon={<ExitToAppIcon />}
          variant="outlined"
          fullWidth
          sx={{ borderRadius: 5 }}
        >
          Cerrar sesión
        </Button>
        </Box>
        
      </Box>
    </Box>
  </Box>
   
  );
}

export default Sidebar;
