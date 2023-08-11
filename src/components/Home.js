import React from 'react';
import CardEvent from './CardEvent';
const Home = () => {
  return (
    <div>
      <h1>Welcome to Your Calendar</h1>
      <button>Create New Appointment</button>
      <div>
        {/* Aquí colocaremos el componente de Calendario */}
      </div>
      <div >
        <CardEvent/>
      </div>
    </div>
  );
}

export default Home;