import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EventModal from './Modal';

function Calendar() {
  const totalColumns = 7;
  const totalRows = 6;
  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];  // Iniciales de los días de la semana en español
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  return (
    <div style={{ margin: "30px" }}>
        <EventModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      {/* Nuevo div antes del Grid container */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: '4',  display:'flex',marginLeft:10,  alignItems: 'center' }}>
        <Typography variant='heading' component={'h2'} fontWeight={700} >
                Agos 
                <Typography variant='label'sx={{marginLeft: '10px'}}  fontWeight={400} >
                 2023
                </Typography>
        </Typography>
        </div>
        <div style={{ flex: '2', }}>
          <IconButton color="secondary">
          <ChevronLeftIcon fontSize='15' />
        </IconButton>
        <IconButton aria-label="fingerprint" color="secondary">
        <ChevronRightIcon />
        </IconButton>
        </div>
      </div>
      {/* Fin del nuevo div */}

      <Grid container spacing={1}>
        {Array.from({ length: totalRows * totalColumns }).map((_, index) => (
          <Grid item xs={12 / totalColumns} key={index}>
            <Paper style={{ padding: "6px", textAlign: "center", cursor: "pointer", hover: { backgroundColor: "red"  }}} elevation={0}>
            <Typography variant='label' fontWeight={500} >
                {index < 7 ? daysOfWeek[index] : index - 6}
            </Typography>
            </Paper>
          </Grid>
        ))}
        <Grid 
          container xs={8} 
          mx={"auto"} marginTop={'30px'} 
          display={"flex"} justifyContent={"center"} 
          flexDirection={'row'} >
            <Button
            fullWidth
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            sx={{ borderRadius: 5 }}
          >
            Crear nuevo evento
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Calendar;
