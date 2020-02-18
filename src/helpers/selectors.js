export function getAppointmentsForDay(state, day) {
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

