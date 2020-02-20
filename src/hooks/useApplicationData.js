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
  dispatch({ type: SET_DAY, value: {day: day} });
} 

function setApp (all) {
  dispatch({ type: SET_APPLICATION_DATA, value: { days:all[0].data, appointments:all[1].data, interviewers:all[2].data} });
} 

function setInterview (appointments) {
  dispatch({ type: SET_INTERVIEW, value: { appointments:appointments} });
} 


useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get(`http://localhost:8001/api/appointments`),
    axios.get(`http://localhost:8001/api/interviewers`)
  
  ]).then((all) => {
    setApp(all)
  });
}, []);

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
 return axios({
    method: 'put',
    url: `http://localhost:8001/api/appointments/${id} `,
    data: {
      interview
    }
  }).then(() => setInterview(appointments))
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
  return axios({
    method: 'delete',
    url: `http://localhost:8001/api/appointments/${id} `,
  }).then(() => setInterview(appointments))
}
 return { state, setDay, bookInterview, cancelInterview }
}




// import  { useState, useEffect, useReducer } from "react";
// import axios from 'axios';

// export default function useApplicationData() {
// const [state, setState] = useState({
//   day: "Monday",
//   days: [],
//   appointments: {},
//   interviewers: {}
// });

// const setDay=day => setState({ ...state, day: day });

// useEffect(() => {
//   Promise.all([
//     axios.get(`http://localhost:8001/api/days`),
//     axios.get(`http://localhost:8001/api/appointments`),
//     axios.get(`http://localhost:8001/api/interviewers`)
  
//   ]).then((all) => {
//     console.log(all)
//     setState(prev => ({ ...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }))
    
//   });
// }, []);

// function bookInterview(id, interview) {
//   console.log(id, interview);
//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview }
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//  return axios({
//     method: 'put',
//     url: `http://localhost:8001/api/appointments/${id} `,
//     data: {
//       interview
//     }
//   }).then(() => setState({...state, appointments:appointments}))
// }

// function cancelInterview(id) {
//   const appointment = {
//     ...state.appointments[id],
//     interview: null
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   return axios({
//     method: 'delete',
//     url: `http://localhost:8001/api/appointments/${id} `,
//   }).then(() => setState({...state, appointments:appointments}))
// }
//  return { state, setDay, bookInterview, cancelInterview }
// }
