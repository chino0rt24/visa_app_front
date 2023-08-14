import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({text, type, visible}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {visible ? <Snackbar open={visible} autoHideDuration={6000} onClose={() =>{}}>
        <Alert onClose={() =>{}} severity={type} sx={{ width: '100%' }}>
         {text}
        </Alert>
      </Snackbar> : null}
    </Stack>
  );
}
export default Toast