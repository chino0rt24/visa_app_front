import React from 'react';
import CardEvent from './CardEvent';
import SettingWeekly from './SettingWeekly';
import  Grid  from '@mui/material/Grid';
import Calendar from './Calendar'
import Timeline from './Timeline';
import Sidebar from './Sidebar';
const Home = () => {
  return (
   <Grid container xs={12} mx={'auto'} 
    display={'flex'} flexDirection={'row'} 
    justifyContent={'space-around'}  
    height={'100vh'} 
    bgcolor={'secondary.main'} >
    <Grid sx={{height: '90vh', borderRadius: 8}}  bgcolor={'white'} my={'auto'} item xs={2}>
      <Sidebar/>
    </Grid>
    <Grid item xs={5} overflow={'scroll'} height={'100%'} >
      <Timeline/>
    </Grid>
    <Grid sx={{height: '90vh', borderRadius: 8}} bgcolor={'white'} my={'auto'} item xs={3}>
    <Calendar  className={'ContainerCalendar'} />
    </Grid>
   </Grid>
  );
}

export default Home;