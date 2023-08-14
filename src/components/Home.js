import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Calendar from './Calendar';
import Timeline from './Timeline';
const Home = () => {
  return (
    <Grid container xs={12} mx={'auto'} 
      display={'flex'} flexDirection={'row'} 
      justifyContent={'space-around'}  
      height={'85vh'} 
      bgcolor={'#f6f6f6'} >
      <Grid item xs={5} overflow={'scroll'} height={'100%'} >
        <Timeline/>
      </Grid>
      <Grid sx={{height: '60vh', borderRadius: 8}} bgcolor={'white'} my={2} item xs={3}>
        <Calendar className={'ContainerCalendar'} />
      </Grid>
    </Grid>
  );
}

export default Home;
