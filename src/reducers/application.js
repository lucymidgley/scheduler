export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export function getDayId(state, id) {
  for (let day of state.days) { 
    if (day.appointments.includes(id)) {
      return day.id - 1;
    }
  }    
}

export default function reducer(state, action) {
  switch (action.type) {
    // case SET_DAY:
    //   return { ...state, ...action.value  }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW: {
      
      const id = action.value.id;
      const interview = action.value.interview
      let appointment = {};
      if(interview) {
        appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
      } else {
        appointment = {
          ...state.appointments[id],
          interview: null
        };
      }
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
          const dayId = getDayId(state, id);
          const days = [ ...state.days ];
          const appointmentsForDay = state.days[dayId].appointments;
          let spotCount = 0;
          for (let appointment of appointmentsForDay) {
            let currentAppointment = appointments[appointment]
            if (!currentAppointment.interview || Object.keys(currentAppointment.interview).length === 0) {
              spotCount++;
            }
          }    
          const day = {
            ...state.days[dayId],
            spots: spotCount
          }
            days[dayId] = day;
      return { ...state, appointments:appointments, days:days}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}