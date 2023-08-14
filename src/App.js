
import './App.css';
import {router} from './routes/router';
import { RouterProvider } from 'react-router-dom';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://crekaitnejxwtqmbzvsy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZWthaXRuZWp4d3RxbWJ6dnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NzI4NTYsImV4cCI6MjAwNzU0ODg1Nn0.57u94HOGBk9xaHX_GXBqRZSI813ZlYGvUpcHJMu3RTI"
  );
function App() {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (    
    <SessionContextProvider supabaseClient={supabase}>
        <Provider store={store} >
          <RouterProvider router={router}/>    
     </Provider> 
    </SessionContextProvider>              
  );
}

export default App;
