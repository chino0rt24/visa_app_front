import React, { useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work'; // Suponiendo que usas el ícono de Material-UI
import SchoolIcon from '@mui/icons-material/School'; // Suponiendo que usas el ícono de Material-UI
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import EventModal from './Modal';
import {Typography} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



function Timeline() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, onChange] = useState(new Date());

  const events = [
    {
      date: '09:30',
      title: 'Solicitud de visa',
      subtitle: 'Miami, FL',
      description:'',
      className: 'vertical-timeline-element--work',
      icon: <WorkIcon />
    },
    {
      date: '11:45',
      title: 'Solicitud de trabajadores',
      subtitle: 'San Francisco, CA',
      description:'',
      className: 'vertical-timeline-element--work',
      icon: <SchoolIcon />
    },
    {
        date: '13:00',
        title: 'Seguimiento de proceso',
        subtitle: 'San Francisco, CA',
        description:'',
        className: 'vertical-timeline-element--work',
        icon: <SchoolIcon />
      },
      {
        date: '15:00',
        title: 'Solicitud de visa',
        subtitle: 'San Francisco, CA',
        description:'',
        className: 'vertical-timeline-element--work',
        icon: <WorkIcon />
      },
      {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description:'',
        className: 'vertical-timeline-element--work',
        icon: <WorkIcon />
      },
      {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description:'',
        className: 'vertical-timeline-element--work',
        icon: <WorkIcon />
      },
    
  ];

  return (
    <VerticalTimeline>
      {events.map((event, index) => (
      <VerticalTimelineElement
      key={index}
      className={event.className}
      contentStyle={{ background: 'white' }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={event.icon}
      date={<span style={{ marginLeft: '20px', marginRight: '20px' }}>{event.date}</span>}
    >
      <EventModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      <Typography component={'p'} fontWeight={'medium'} >{event.description}</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <h3 className="vertical-timeline-element-title"  >{event.title}</h3> */}
        <Typography component={'p'} fontWeight={'medium'} >{event.title}</Typography>

        <IconButton onClick={() => setIsModalOpen(true)}  >
          <EditIcon />
        </IconButton>
      </div>
      <h4 className="vertical-timeline-element-subtitle">{event.subtitle}</h4>
      <Typography >{event.description}</Typography>
      <Button sx={{fontSize: '12px'}} >
        <ContentCopyIcon sx={{fontSize: '18px'}} ></ContentCopyIcon>Copiar enlace
      </Button>
    </VerticalTimelineElement>
    
      ))}
    </VerticalTimeline>
  );
}

export default Timeline;

