import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardEvent({eventDecription}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor:'transparent', boxShadow:'none', color:'white' }}>
      <CardHeader
        action={
          <IconButton color='white'  aria-label="settings">
            <SettingsIcon sx={{color:'white'}}/>
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography  variant="body2" color="text.secondary">
            {eventDecription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  aria-label="add to favorites">
          <CreateIcon sx={{color:'white'}} />
        </IconButton>
        <Button   sx={{color:'white'}} size="small">Copiar enlace</Button>
      </CardActions>
    </Card>
  );
}