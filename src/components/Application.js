import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors.js"


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "William Blake",
//       interviewer: { 
//         id: 2,
//         name: "Tori Malcolm", 
//         avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//     }
//   },
//   {
//     id: 4,
//     time: "5pm",
//     interview: {
//       student: "Emily Dickinson",
//       interviewer: { 
//         id: 3, 
//         name: "Mildred Nazir", 
//         avatar: "https://i.imgur.com/T2WwVfS.png" }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
//   {
//     id: 6,
//     time: "5pm",
//     interview: {
//       student: "Robert Frost",
//       interviewer: { 
//         id: 4, 
//         name: "Cohana Roy", 
//         avatar: "https://i.imgur.com/FK8V841.jpg" 
//       }
//     }
//   }
// ];



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

