export default function getAppointmentsForDay(state, day) {
  const appointmentsArr = function(state, day){
    for( const stateDay of state.days){
    if(stateDay.name === day){
      return stateDay.appointments;
    }
  }
    return [];
}
  const appArr = appointmentsArr(state, day);
  const outputArr = [];
  for(const appId in state.appointments){
    if(appArr.includes(Number(appId))){
      outputArr.push(state.appointments[appId])
    }
  }
return outputArr;
}


export function getInterview(state, interview) {
  if(interview){
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  const interviewOut = {student: interview.student, interviewer: interviewer}
  
    return interviewOut;
} else return null
}


export function getInterviewersForDay(state, day) {
  const interviewersArr = function(state, day){
    for( const stateDay of state.days){
    if(stateDay.name === day){
      return stateDay.interviewers;
    }
  }
    return [];
}

  const intArr = interviewersArr(state, day);
  const outputArr = [];
  for(const intId in state.interviewers){
    if(intArr.includes(Number(intId))){
      outputArr.push(state.interviewers[intId])
    }
  }
return outputArr;
}
