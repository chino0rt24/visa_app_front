import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography, IconButton, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EventModal from './Modal';
import Toast from './Toast';
import * as Actions from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { weekNumberOfDate } from '../utils/functions';

const totalColumns = 7;
const totalRows = 6;
const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];  // Iniciales de los días de la semana en español

function getCurrentMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  let daysArray = new Array(totalRows * totalColumns).fill(null);
  
  for(let i = 1; i <= daysInMonth; i++) {
    daysArray[startingDayOfWeek + i - 1] = i;
  }

  return daysArray;
}

function Calendar() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthDays = getCurrentMonthDays(currentMonth);
  const [toastInfo, setToastInfo] = useState({text: '', type: '', visible: false});
  const loading = useSelector(store => store.Event.spinner_create);
  const success_create_event = useSelector(store => store.Event.spinner_create);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());  // Establecer el día actual como predeterminado


  const handleMonthChange = (delta) => {
    setCurrentMonth(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + delta);
      return newDate;
    });
  };


  const handleDayClick = (day) => {
    setSelectedDay(day);
  };


  useEffect(() => {
    console.log("success_create_event", success_create_event);
    if(success_create_event){
      setIsModalOpen(false);
      setToastInfo({
        text: 'Evento creado con éxito!🎉. Enviamos a tu contacto los datos de la cita',
        type: 'success',
        visible: true
      });
      setTimeout(() => {
        setToastInfo({
          text: '',
          type: '',
          visible: false
        });
        dispatch(Actions.CreateEventAction('PURGE'));
        const week = weekNumberOfDate(new Date())
        dispatch(Actions.GetEventsAction({week}));
      }, 3000)
    }
  }, [loading]);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  return (
    <div style={{ margin: "30px" }}>
      <Toast text={toastInfo?.text} type={toastInfo?.type} visible={toastInfo?.visible} />
      <EventModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: '4',  display:'flex',marginLeft:10,  alignItems: 'center' }}>
          <Typography variant='heading' component={'h2'} fontWeight={700} >
                {monthNames[currentMonth.getMonth()]} 
                <Typography variant='label'sx={{marginLeft: '10px'}}  fontWeight={400} >
                 {currentMonth.getFullYear()}
                </Typography>
          </Typography>
        </div>
        <div style={{ flex: '2', }}>
          <IconButton color="secondary" onClick={() => handleMonthChange(-1)}>
            <ChevronLeftIcon fontSize='15' />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleMonthChange(1)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>

      <Grid container spacing={1}>
      {monthDays.map((day, index) => (
          <Grid item xs={12 / totalColumns} key={index}>
            <Paper 
              style={{
                padding: "8px", 
                textAlign: "center", 
                cursor: "pointer",
                backgroundColor: day === selectedDay ? 'rgb(0,105,255)' : 'transparent',  // Verifica si el día es el seleccionado
                borderRadius: '50%', 
                color: day === selectedDay ? 'white' : 'black'  // Verifica si el día es el seleccionado
              }}
              elevation={0}
              onClick={() => day && handleDayClick(day)}  // Solo si hay un día válido
            >
              <Typography variant='label' fontWeight={500} >
                {index < 7 ? daysOfWeek[index] : day || ''}
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
