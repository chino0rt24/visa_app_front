import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work'; // Suponiendo que usas el ícono de Material-UI
import SchoolIcon from '@mui/icons-material/School'; // Suponiendo que usas el ícono de Material-UI

function Timeline() {
  const events = [
    {
      date: '2011 - present',
      title: 'Creative Director',
      subtitle: 'Miami, FL',
      description: 'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
      className: 'vertical-timeline-element--work',
      icon: <WorkIcon />
    },
    {
      date: '2010 - 2011',
      title: 'Art Director',
      subtitle: 'San Francisco, CA',
      description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
      className: 'vertical-timeline-element--work',
      icon: <SchoolIcon />
    },
    {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
        className: 'vertical-timeline-element--work',
        icon: <SchoolIcon />
      },
      {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
        className: 'vertical-timeline-element--work',
        icon: <WorkIcon />
      },
      {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
        className: 'vertical-timeline-element--work',
        icon: <WorkIcon />
      },
      {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
        className: 'vertical-timeline-element--work',
        icon: <WorkIcon />
      },
      {
        date: '2010 - 2011',
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        description: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
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
          contentStyle={{ background: '#4150D9', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={event.icon}
          date={<span style={{ marginLeft: '20px', marginRight: '20px' }}>{event.date}</span>}
        >
          <h3 className="vertical-timeline-element-title">{event.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{event.subtitle}</h4>
          <p>{event.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}

export default Timeline;

