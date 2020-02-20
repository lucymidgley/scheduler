import  { useEffect, useReducer } from "react";
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, ...action.value  }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW: {
      return { ...state, ...action.value }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
const initial = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
}
export default function useApplicationData() {

const [state, dispatch] = useReducer(reducer, initial);

function setDay (day) {
  dispatch({ type: SET_DAY, value: {day} });
} 

function setApp (days, appointments, interviewers) {
  dispatch({ type: SET_APPLICATION_DATA, value: { days, appointments, interviewers} });
} 

function setInterview (appointments, days) {
  dispatch({ type: SET_INTERVIEW, value: { appointments, days} });
} 


useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get(`http://localhost:8001/api/appointments`),
    axios.get(`http://localhost:8001/api/interviewers`)
  
  ]).then((all) => {
    const days = all[0].data;
    console.log(days)
    const appointments = all[1].data;
    const interviewers = all[2].data;
    setApp(days, appointments, interviewers)
  });
}, []);
function getDayId(dayName, days) {
for( const day of days) {
  if(day.name === dayName){
    return (day.id - 1)
  }
}
}
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
  const dayId = getDayId(state.day, state.days);

  const spotsNew = state.days[dayId]['spots'] - 1;
  const day = {
    ...state.days[dayId],
    spots: spotsNew
  }
  console.log(day)
 state.days[dayId] = day;

const days = [...state.days]
 return axios({
    method: 'put',
    url: `http://localhost:8001/api/appointments/${id} `,
    data: {
      interview
    }
  }).then(() => setInterview(appointments, days))
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const dayId = getDayId(state.day, state.days);

  const spotsNew = state.days[dayId]['spots'] + 1;
  const day = {
    ...state.days[dayId],
    spots: spotsNew
  }
  console.log(day)
 state.days[dayId] = day;

const days = [...state.days]
  return axios({
    method: 'delete',
    url: `http://localhost:8001/api/appointments/${id} `,
  }).then(() => setInterview(appointments, days))
}
 return { state, setDay, bookInterview, cancelInterview }
}

