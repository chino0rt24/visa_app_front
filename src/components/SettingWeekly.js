import React from 'react';
import  Typography  from '@mui/material/Typography';
import { Card, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { hoursArray } from '../utils/constants';
import Paper from '@mui/material/Paper';
import  { useState, useEffect } from 'react';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { weekNumberOfDate } from '../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Actions from '../redux/actions';
import Toast from './Toast';

const SettingWeekly = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [text, setText] = useState('');
  const [startHour, setStartHour] = useState('08:00');
  const [endHour, setEndHour] = useState('18:00');
  const [daysAvailable, setDaysAvailable] = useState([false, false, false, false, false, false, false]);
  const dispatch = useDispatch();
  const [toastInfo, setToastInfo] = useState({text: '', type: '', visible: false});
  const loading = useSelector((state) => state.WeeklyHours.spinner_configurate_weekly);
  const success_setting = useSelector((state) => state.WeeklyHours.data_configurate_weekly);

  useEffect(() => {
    const user =  JSON.parse(localStorage.getItem('user'));
    setText(user?.name);
    setShowGreeting(true);
  }, []);

  const sendDataToServer = async () => {
    let data = formatProps();
    dispatch(Actions.ConfigurateWeeklyAction(data));
  };

  useEffect(() => {
    console.log(success_setting);
    if(success_setting?.message){
      console.log("lanzando success_setting" , success_setting);

      setToastInfo({
        text: 'Configuración guardada con éxito!🎉',
        type: 'success',
        visible: true
      })

      setTimeout(() => {
        setToastInfo({
          text: '',
          type: '',
          visible: false
        });
        dispatch(Actions.ConfigurateWeeklyAction('PURGE'));
      }, 3000)
    }
  },[loading])

  const daysWeek = [ 
    { dia: 'Lunes', day:'monday' },
    { dia: 'Martes', day:'tuesday' },
    { dia: 'Miercoles', day:'wednesday' }, 
    { dia: 'Jueves', day:'thursday' }, 
    { dia: 'Viernes', day:'Friday' }, 
    { dia: 'Sabado', day:'saturday' }, 
    { dia: 'Domingo', day:'sunday' }, 
  ] 

  const formatProps = () => {
    const daysHours = daysAvailable.map((day, index) => {
      let data = {
        available: day,
        startHour: day ? startHour : '',
        endHour: day ? endHour : '',
      }
      return data
    })
    const days = {
      monday: daysHours[0],
      tuesday: daysHours[1],
      wednesday: daysHours[2],
      thursday: daysHours[3],
      friday: daysHours[4],
      saturday: daysHours[5],
      sunday: daysHours[6],
    }
   const dataSetting = {
     week: weekNumberOfDate(new Date().toISOString()),
     year: new Date().getFullYear(),
     days
   }
   return dataSetting
  }
  const CheckGroupDays = () => {
    return (
      <Grid container direction="row" 
        sx={{borderColor: 'grey.300', borderRadius:1 }}
        border={2} 
        mx={'auto'}
        >
      {daysWeek.map((item, index) => (
        <Grid  
          flex={1}
          display={'flex'}
          direction={'row'}
          justifyContent={'center'}
          alignItems='center'
          sx={{ borderRight: index !== 6 ? 2 : 0, 
            borderColor: 'grey.300' }}
          >
        <FormControl >
            <FormControlLabel
            value="bottom"
            control={<Checkbox checked={daysAvailable[index]} onChange={
              (value) => {
                let newDays = daysAvailable;
                newDays[index] = value.target.checked;
                setDaysAvailable([...newDays]);
            }} />}
            label={item.dia}
            labelPlacement="bottom"
          />
            </FormControl>
        </Grid>
      ))}
      </Grid>

    )
  }
  
  return (
    <Box  
      bgcolor={'#f6f6f6'} 
      sx={{  width: '100%', height: '100vh' }} 
      display={'flex'}
      flexDirection={'row'} justifyContent={'center'}
      alignItems={'flex-start'}
    >    
    <Card  sx={{ display: 'flex',
      flexDirection: 'column', borderRadius: 3, 
      marginTop:2,
      width: '50%', mx: 'auto' }} >
    <Toast text={toastInfo?.text} type={toastInfo?.type} visible={toastInfo?.visible} />    
        <Grid container 
          style={{ 
            border: "1px solid grey.300", 
          }}
        >
          <Grid item container xs={12} style={{ padding: 16 }}>
            <Grid item xs={8} marginTop={1} >
              <Typography variant="h5" fontWeight="medium" component="h2">
                ¡Configura tu horario!
              </Typography>
              <Typography variant="body1" fontWeight="regular" component="p">
                Con ello podrás crear tus horarios de atención y tus citas se programarán automáticamente. 
                Tú tiempo es lo que más importa
              </Typography>
            </Grid>
            <Grid item xs={4} display={'flex'} direction={'row'} justifyContent={'center'} >
              <img src={require('../assets/images/hours.png')} width={100} height={100}  />
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} bgcolor={'white'} sx={{padding:2}} >
          <Typography variant="p" fontWeight="bold" sx={{marginBottom:2}} component="p">
                Horario de atención
          </Typography>
            <Grid container xs={12} justifyContent={'space-between'} >
              <Grid item xs={5}>
              <FormControl fullWidth >
                    <InputLabel id="label-desde">Desde</InputLabel>
                    <Select
                      fullWidth
                      labelId="label-desde"
                      id="select-desde"
                      value={startHour}
                      label="Desde"
                      placeholder={'08:00'}
                      onChange={(item)=>{ setStartHour(item.target.value)}}
                    >
                  {hoursArray.map((item, index) => (
                    <MenuItem value={item.hour}>{item.hour}</MenuItem>
                  ))}
                    </Select>
              </FormControl>
              </Grid>
              <Grid item xs={5}>
              <FormControl fullWidth xs={5} >
                    <InputLabel id="label-hasta">Hasta</InputLabel>
                    <Select
                      fullWidth
                      labelId="label-hasta"
                      id="select-hasta"
                      label="Hasta"
                      value={endHour}
                      onChange={(item)=>{ setEndHour(item.target.value)}}
                    >
                  {hoursArray.map((item, index) => (
                    <MenuItem value={item.hour}>{item.hour}</MenuItem>
                  ))}
                    </Select>
            </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} bgcolor={'white'} sx={{padding:2}} >
          <Typography variant="p" fontWeight="bold" sx={{marginBottom:2}} component="p">
                Días laborales
          </Typography>
          <CheckGroupDays/>
    
          </Grid>
          <Grid item xs={10}  mx={'auto'} bgcolor={'white'} padding={2} marginBottom={3} >
          <Typography variant="body1" lineHeight={1.2} fontWeight="regular" component="p">
            ¿No estás seguro de los días que quieres programar? ¡Descuida! Puedes cambiarlos en cualquier momento 🎉
          </Typography>
          </Grid>
          <Grid container justifyContent="flex-end" padding={2}>
          <LoadingButton
          size="small"
          endIcon={< TaskAltIcon />}
          onClick={sendDataToServer}
          loading={loading}
          variant="contained"
          color="primary"
        >
          Finalizar
        </LoadingButton>
          </Grid>
        </Grid>
        </Card>
      </Box>
  
  );
}

export default SettingWeekly;