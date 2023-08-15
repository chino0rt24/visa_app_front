import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import {
  Button,
  TextField,
  Paper,
  Avatar,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress'; // Importa el spinner
import { useHistory, useNavigate } from 'react-router-dom';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import GoogleCalendarComponent from './AuthCalendar';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el spinner
  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const navigate = useNavigate()


  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar.events',
        
      },
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const formStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <Box bgcolor={'#f6f6f6'}  display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Avatar sx={{ backgroundColor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h5">Iniciar sesión</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección de correo"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body2" align="center">
            O
          </Typography>
        </Grid>
        <Grid item>
      {isLoading ? (
        <CircularProgress /> // Mostrar spinner si isLoading es verdadero
      ) : (

        <Button  onClick={googleSignIn} variant="outlined" >
          Iniciar sesión con google
        </Button>
      )}
    </Grid>
      </Grid>
    </Paper>
  </Box>
  );
};

export default Login;