
import './App.css';
import {router} from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={"867952354032-do43ibra0nof9bjr9jjfg71pl2gv0fum.apps.googleusercontent.com"}>
    <RouterProvider router={router}/>
  </GoogleOAuthProvider>
    
  );
}

export default App;
