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
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el spinner


  const handleGoogleLoginClick = () => {
    setIsLoading(true);  // Mostrar el spinner al hacer clic en el botón
  };

  const handleGoogleLoginSuccess = (response) => {
    setIsLoading(false); // Ocultar el spinner en caso de éxito
    const decodedToken = jwtDecode(response.credential);
    const user = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/settingWeekly');  
    
  };

  const handleGoogleLoginFailure = (error) => {
    setIsLoading(false); // Ocultar el spinner en caso de error
    console.error('Google Login Error:', error);
  };

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
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <GoogleLogin
              clientId="867952354032-do43ibra0nof9bjr9jjfg71pl2gv0fum.apps.googleusercontent.com"
              buttonText="Login con Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              redirectUri="http://localhost:3000"
              onClick={handleGoogleLoginClick} // Llamada al método que muestra el spinner
            />
          }
        >
          Iniciar con Google
        </Button>
      )}
    </Grid>
      </Grid>
    </Paper>
  </Box>
  );
};

export default Login;