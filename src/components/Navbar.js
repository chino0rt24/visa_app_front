import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch(newValue) {
      case 0: navigate('/home'); break;
      case 1: navigate('/settings'); break;
      case 2: navigate('/chatbot'); break;

    }
  };
  return (

    <Box sx={{display:'flex', flexDirection:'column', flex:1}} >
      <AppBar/>
      <Container maxWidth="xl" sx={{bgcolor:'white'}} >
      <Toolbar disableGutters mx={'auto'} >
        <Tabs value={value} onChange={handleChange} mx={'auto'} sx={{width:'90%', mx:'auto'}} aria-label="basic tabs example">
          <Tab label="Mi calendario" {...a11yProps(0)} />
          <Tab label="Ajustes" {...a11yProps(1)} />
          <Tab label="Chatbot" {...a11yProps(2)} />
        </Tabs>
        </Toolbar>
        </Container>    
      <div>
        <Outlet/>
      </div>
    </Box>
  );
}

export default Navbar;