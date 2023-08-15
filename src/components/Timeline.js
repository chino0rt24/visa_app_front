import React, { useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work'; // Suponiendo que usas el ícono de Material-UI
import SchoolIcon from '@mui/icons-material/School'; // Suponiendo que usas el ícono de Material-UI
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import {Typography} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector, useDispatch } from 'react-redux';
import  * as Actions from '../redux/actions';
import { weekNumberOfDate } from '../utils/functions';
import Toast from './Toast';

function Timeline() {
  const dispatch = useDispatch();
  const events = useSelector(store => store.Event.events);
  const [toastInfo, setToastInfo] = useState({text: '', type: '', visible: false});

  // const events = [
  //   {
  //     date: '09:30',
  //     title: 'Solicitud de visa',
  //     subtitle: 'Miami, FL',
  //     description:'',
  //     className: 'vertical-timeline-element--work',
  //     icon: <WorkIcon />
  //   },
  //   {
  //     date: '11:45',
  //     title: 'Solicitud de trabajadores',
  //     subtitle: 'San Francisco, CA',
  //     description:'',
  //     className: 'vertical-timeline-element--work',
  //     icon: <SchoolIcon />
  //   },
  //   {
  //       date: '13:00',
  //       title: 'Seguimiento de proceso',
  //       subtitle: 'San Francisco, CA',
  //       description:'',
  //       className: 'vertical-timeline-element--work',
  //       icon: <SchoolIcon />
  //     },
  //     {
  //       date: '15:00',
  //       title: 'Solicitud de visa',
  //       subtitle: 'San Francisco, CA',
  //       description:'',
  //       className: 'vertical-timeline-element--work',
  //       icon: <WorkIcon />
  //     },
  //     {
  //       date: '2010 - 2011',
  //       title: 'Art Director',
  //       subtitle: 'San Francisco, CA',
  //       description:'',
  //       className: 'vertical-timeline-element--work',
  //       icon: <WorkIcon />
  //     },
  //     {
  //       date: '2010 - 2011',
  //       title: 'Art Director',
  //       subtitle: 'San Francisco, CA',
  //       description:'',
  //       className: 'vertical-timeline-element--work',
  //       icon: <WorkIcon />
  //     },
    
  // ];

  const handleCopyClick = async (link) => {
    try {
        await navigator.clipboard.writeText(link);
        console.log('Texto copiado al portapapeles');
        setToastInfo({
          text: 'Enlace de videollamada copiado al portapapeles',
          type: 'success',
          visible: true
        })
        setTimeout(() => {
          setToastInfo({
            text: '',
            type: '',
            visible: false
          });
        }, 3000)
    } catch (err) {
        console.error('Error al copiar texto: ', err);
    }
};

  useEffect(() => {
    const week = weekNumberOfDate(new Date());
    dispatch(Actions.GetEventsAction({week}));
  },[])

  useEffect(() => {
      console.log("los eventos", events);
      
  },[events]);

  return (
    <VerticalTimeline>
      <Toast text={toastInfo?.text} type={toastInfo?.type} visible={toastInfo?.visible}  />

      {events?.map((event, index) => (
      <VerticalTimelineElement
      key={index}
      className={event.className}
      contentStyle={{ background: 'white' }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={ <WorkIcon />}
      date={<span style={{ marginLeft: '20px', marginRight: '20px' }}>{event.date}</span>}
    >
      <Typography component={'p'} fontWeight={'medium'} >{event.type}</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <h3 className="vertical-timeline-element-title"  >{event.title}</h3> */}
        <Typography component={'p'} fontWeight={'medium'} >{event.title}</Typography>

        <IconButton onClick={() => {}}  >
          <EditIcon />
        </IconButton>
      </div>
      <h4 className="vertical-timeline-element-subtitle">{event.subtitle}</h4>
      <Typography >{event.description}</Typography>
      <Button onClick={() => handleCopyClick(event.hangoutLink)} sx={{fontSize: '12px'}} >
        <ContentCopyIcon sx={{fontSize: '18px'}} ></ContentCopyIcon>Copiar enlace
      </Button>
    </VerticalTimelineElement>
    
      ))}
    </VerticalTimeline>
  );
}

export default Timeline;

