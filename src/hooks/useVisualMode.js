import{ useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //save history state object so we can remember the history of the modes
  function transition(second, replace) {
    setMode(second)
    if(!replace){ //only save the history if we do want to remember the mode
      setHistory(prev => ([...prev, mode]))
    }
  }
  function back() {
    if(history.length > 1){
      setMode(history.pop());
    } else {
      setMode(history[0]) //remove the mode from the history and set the mode to be the last element. Check that history has length > 1
    }
  }
  return { mode, transition, back };
}




 