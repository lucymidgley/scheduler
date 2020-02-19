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
  console.log(interviewerId);
  const interviewer = state.interviewers[interviewerId];
  const interviewOut = {student: interview.student, interviewer: interviewer}
  
    return interviewOut;
} else return null
}
