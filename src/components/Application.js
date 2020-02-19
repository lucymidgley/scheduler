import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay=day => setState({ ...state, day: day });
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    
    ]).then((all) => {
      console.log(all)
      setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }))
      
    });
  }, []);

  console.log(state.interviewers)

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios({
      method: 'put',
      url: `http://localhost:8001/api/appointments/${id} `,
      data: {
        interview
      }
    }).then(setState({...state, appointments:appointments}));
  }
  
  
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
      

      { appointments.map(
        //const interview = getInterview(state, appointment.interview);
        appointment => ( <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={getInterview(state, appointment.interview)} interviewers={interviewers} bookInterview={bookInterview} />))}
  <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}

