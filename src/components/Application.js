import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors.js"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay=day => setState({ ...state, day: day });
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`)
    
    ]).then((all) => {
      console.log(all)
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data }))
      
    });
  }, []);

  console.log(state.appointments)

  
  console.log('apps', state.appointments)
  console.log(state.day.toString())
  //

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
  days={state.days}
  day={state.day}
  setDay={day => setDay(day)}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      { 
      getAppointmentsForDay(state, state.day).map(appointment => ( <Appointment key={appointment.id} {...appointment} />))}
  <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}

