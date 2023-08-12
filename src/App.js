
import './App.css';
import {router} from './routes/router';
import { RouterProvider } from 'react-router-dom';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
function App() {
  return (                          
    <RouterProvider router={router}/>    
  );
}

export default App;
