import  { useEffect, useReducer } from "react";
import axios from 'axios';
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application.js"
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
// const SET_DAY = "SET_DAY";

// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";
// const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
// function getDayId(state, id) {
//   for (let day of state.days) { 
//     if (day.appointments.includes(id)) {
//       return day.id - 1;
//     }
//   }    
// }
// function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return { ...state, ...action.value  }
//     case SET_APPLICATION_DATA:
//       return { ...state, ...action.value }
//     case SET_INTERVIEW: {
      
//       const id = action.value.id;
//       const interview = action.value.interview
//       let appointment = {};
//       if(interview) {
//         appointment = {
//           ...state.appointments[id],
//           interview: { ...interview }
//         };
//       } else {
//         appointment = {
//           ...state.appointments[id],
//           interview: null
//         };
//       }
      
//       const appointments = {
//         ...state.appointments,
//         [id]: appointment
//       };
//           const dayId = getDayId(state, id);
//           const days = [ ...state.days ];
//           const appointmentsForDay = state.days[dayId].appointments;
//           let spotCount = 0;
//           for (let appointment of appointmentsForDay) {
//             let currentAppointment = appointments[appointment]
//             if (!currentAppointment.interview || Object.keys(currentAppointment.interview).length === 0) {
//               spotCount++;
//             }
//           }    
//           const day = {
//             ...state.days[dayId],
//             spots: spotCount
//           }
//             days[dayId] = day;
//       return { ...state, appointments:appointments, days:days}
//     }
//     default:
//       throw new Error(
//         `Tried to reduce with unsupported action type: ${action.type}`
//       );
//   }
// }


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

function setInterview (interview, id) {
  dispatch({ type: SET_INTERVIEW, value: { interview, id} });
} 


useEffect(() => {
    socket.onmessage = event => {
      console.log(`Message Received: ${event.data}`);
      const fromServer = JSON.parse(event.data)
      if(fromServer.type==="SET_INTERVIEW") {
        const id = fromServer.id;
        const interview = fromServer.interview
        setInterview(interview, id)
      }
    }
     
  Promise.all([
    axios.get(`/api/days`),
    axios.get(`/api/appointments`),
    axios.get(`/api/interviewers`)
  
  ]).then((all) => {
    const days = all[0].data;
    const appointments = all[1].data;
    const interviewers = all[2].data;
    setApp(days, appointments, interviewers)
  });
}, []);

function bookInterview(id, interview) {
 return axios.put(`/api/appointments/${id} `, {interview})
  .then(() => setInterview(interview, id))
}

function cancelInterview(id, interview = null) {
  return axios.delete(`/api/appointments/${id} `, {interview})
  .then(() => setInterview(interview, id))
}
 return { state, setDay, bookInterview, cancelInterview }
}
