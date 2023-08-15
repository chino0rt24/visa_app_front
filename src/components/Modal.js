/* global gapi, google */

import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Icon, Grid } from '@mui/material';
import MeetIcon from '@mui/icons-material/MeetingRoom';
import ZoomIcon from '@mui/icons-material/ZoomIn';
import { EventAvailable } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../redux/actions';
import { add30Minutes, weekNumberOfDate, obtainYearStringYYYYMMDD, getStartAndEndDate } from '../utils/functions';
import useForm from '../hooks/useForm';
import { createEvent } from '../events/events';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { LoadingButton } from '@mui/lab';
const EventModal = ({ open, handleClose }) => {
    const [selectedDay, setSelectedDay] = useState('monday');  // Estado para el día seleccionado
    const dispatch = useDispatch();
    const availability = useSelector(store => store.WeeklyHours.availability);
    const { form, onChange } = useForm({ });
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [dateCalendar, setDateCalendar] = useState({});
    const [rangeSession, setRangeSession] = useState('');
    const loading = useSelector(store => store.Event.spinner_create);
    const session = useSession(); // tokens, when session exists we have a user
    const handleDayChange = (event) => {
      setSelectedDay(event.target.value);
    }

    function convertirDiaInglesAEspanol(diaIngles) {
      const dias = {
          "Monday": "Lunes",
          "Tuesday": "Martes",
          "Wednesday": "Miércoles",
          "Thursday": "Jueves",
          "Friday": "Viernes",
          "Saturday": "Sábado",
          "Sunday": "Domingo"
      };
  
      return dias[diaIngles] || "Día no válido";
  }

    const handleHourChange = (event) => {
      setStartHour(event.target.value);
      setEndHour(add30Minutes(event.target.value));
      setRangeSession(event.target.value);
      const {startDate, endDate} = getStartAndEndDate(selectedDay,
      event.target.value, add30Minutes(event.target.value));
        setDateCalendar({startDate, endDate});
    }


    useEffect(() =>{
      const week = weekNumberOfDate(new Date().toISOString());
      dispatch(Actions.GetAvailabilityAction({week}));
    },[])


    const handleSave = async () => {
      try {
        const hangoutLink = await createCalendarEvent(form.name, form.description, dateCalendar?.startDate, dateCalendar?.endDate);
       const week = weekNumberOfDate(new Date())
        dispatch(Actions.CreateEventAction({...form, startHour, endHour, hangoutLink,
          week, year: obtainYearStringYYYYMMDD(new Date())
        }));

      } catch (error) {
        console.log('Error al crear el evento:', error.message);
      }

    }
    function createCalendarEvent(summary, description,startDate, endDate) {
      return new Promise((resolve, reject) => {
      alert(session?.provider_token)
      const baseUrl = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
      const url = new URL(baseUrl);

      const params = new URLSearchParams();
      params.append("conferenceDataVersion", 1);
      params.append("alt", 'json');
      params.append("key",'AIzaSyD3cELZIciwE7uG3izApaqQ2hpcR7FJaaA' );
        url.search = params.toString();
        const event = {
          "summary": summary,
          "description":description,
          'start': {
            'dateTime': startDate.toISOString(),
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          'end': {
            'dateTime': endDate.toISOString(), // Usar endDate para la hora de finalización
            'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          'conferenceData': {
            'conferenceId': Math.random().toString(16),
            'createRequest': {
              'requestId': Math.random().toString(16) // Se sugiere usar un identificador aleatorio único para evitar conflictos de solicitud.
            }
          },
          'conferenceDataVersion': 1
        }
    
        fetch(url, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + session?.provider_token, // Access token for google
            'Content-Type': 'application/json',
          },
          query: {
            conferenceDataVersion: 1,
            alt: 'json',
            key: 'AIzaSyD3cELZIciwE7uG3izApaqQ2hpcR7FJaaA'
          },
          body: JSON.stringify(event)
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data && data.hangoutLink) {
            resolve(data.hangoutLink);
          } else {
            reject(new Error('No hangout link provided in response'));
          }
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
    
  
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="event-modal-title"
            aria-describedby="event-modal-description"
        >
            <Box
                sx={{
                    width: 500, // Ancho más grande
                    height: 'auto', // Controlar el alto
                    maxheight: 500, // Altura máxima
                    bgcolor: 'background.paper',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    position: 'absolute',
                    borderRadius: 3,
                    boxShadow: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Typography id="event-modal-title" variant="h6" component="h2">
                        Crear evento
                    </Typography>
                    <EventAvailable sx={{ width: '35px', height: '35px', color: 'secondary.main' }} />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                        onChange={(value) => onChange(value.target.value, 'name')}
                        label="Nombre del evento" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        onChange={(value) => onChange(value.target.value, 'nameCustomer')}
                        label="Cliente" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        onChange={(value) => onChange(value.target.value, 'phone')}
                        label="Teléfono de contacto" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="contact-method-label">Medio de contacto</InputLabel>
                            <Select 
                            onChange={(value) => onChange(value.target.value, 'meeting_type')}
                            labelId="contact-method-label" label="Medio de contacto">
                                <MenuItem value="Meet">
                                    <Icon><MeetIcon /></Icon>
                                    Meet
                                </MenuItem>
                                <MenuItem value="Zoom">
                                    <Icon><ZoomIcon /></Icon>
                                    Zoom
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="event-type-label">Tipo de evento</InputLabel>
                            <Select 
                            onChange={(value) => onChange(value.target.value, 'type')}
                            labelId="event-type-label" label="Tipo de evento">
                                <MenuItem value="Solicitud de visa">Solicitud de visa</MenuItem>
                                <MenuItem value="Seguimiento de proceso">Seguimiento de proceso</MenuItem>
                                <MenuItem value="Solicitud de trabajadores">Solicitud de trabajadores</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        onChange={(value) => onChange(value.target.value, 'description')}
                        label="Descripción del evento" variant="outlined" fullWidth multiline rows={4} />
                    </Grid>
                    <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="day-label">Día</InputLabel>
            <Select labelId="day-label" value={selectedDay} onChange={handleDayChange}>
              {Object.keys(availability).map(day => (
                <MenuItem key={day} value={day}>
                  {convertirDiaInglesAEspanol(day.charAt(0).toUpperCase() + day.slice(1))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="hour-label">Horario</InputLabel>
                        <Select
                         value={rangeSession}
                         onChange={handleHourChange}
                         labelId="hour-label">
                          {availability[selectedDay]?.map((timeSlot, index) => (
                            <MenuItem key={index} value={timeSlot[0]}>
                              {timeSlot[0]} - {timeSlot[1]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                  size="small"
                  onClick={handleSave}
                  loading={loading}
                  variant="contained"
                  color="primary"
                  >
                  Guardar
                </LoadingButton>
                </Box>
            </Box>
        </Modal>
    );
}

export default EventModal;
