import  { useEffect, useReducer } from "react";
import axios from 'axios';
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application.js"
const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

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
      const fromServer = JSON.parse(event.data)
      if(fromServer.type==="SET_INTERVIEW") {
        const id = fromServer.id;
        const interview = fromServer.interview
        setInterview(interview, id)
      }
    }
     
  Promise.all([ //get all the appointment objects from the server then update the state
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
  .then(() => setInterview(interview, id)) //update the server then send the interview and id to the reducer
}

function cancelInterview(id, interview = null) {
  return axios.delete(`/api/appointments/${id} `, {interview})
  .then(() => setInterview(interview, id))
}
 return { state, setDay, bookInterview, cancelInterview } //update the server then send the interview and id to the reducer
}
