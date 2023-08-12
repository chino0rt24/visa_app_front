import React, { useState } from 'react';
import { Modal, Button, Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Icon } from '@mui/material';
import MeetIcon from '@mui/icons-material/MeetingRoom';
import ZoomIcon from '@mui/icons-material/ZoomIn';
import DatePicker from 'react-date-picker';
import { EventAvailable } from '@mui/icons-material';
const EventModal = ({ open, handleClose }) => {
    const [value, onChange] = useState(new Date());

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
      BackdropProps={{
        style: {
          backgroundColor: 'rgb(33, 150, 243, .01)' ,  // Aquí puedes ajustar el color y la opacidad según lo que desees
        },
      }}
    >
       <Box
      sx={{
        width: 400,
        bgcolor: 'background.paper',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'absolute',
        borderRadius: 3,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography id="event-modal-title" variant="h6" component="h2">
          Crear evento
        </Typography>
        <EventAvailable sx={{ width: '35px', height: '35px', color:'secondary.main' }} /> 
      </Box>

      <TextField label="Nombre del evento" variant="outlined" fullWidth />

      <FormControl variant="outlined" fullWidth>
        <InputLabel id="contact-method-label">Medio de contacto</InputLabel>
        <Select labelId="contact-method-label" label="Medio de contacto">
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

      <FormControl variant="outlined" fullWidth>
        <InputLabel id="event-type-label">Tipo de evento</InputLabel>
        <Select labelId="event-type-label" label="Tipo de evento">
          <MenuItem value="Solicitud de visa">Solicitud de visa</MenuItem>
          <MenuItem value="Seguimiento de proceso">Seguimiento de proceso</MenuItem>
          <MenuItem value="Solicitud de trabajadores">Solicitud de trabajadores</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Descripción del evento" variant="outlined" fullWidth multiline rows={4} />
      <DatePicker onChange={onChange} value={value} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ borderRadius: 5 }}>Guardar</Button>
</Box>
    </Box>
    </Modal>
  );
}

export default EventModal;
