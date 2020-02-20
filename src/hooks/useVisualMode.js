import{ useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(second, replace) {
    setMode(second)
    if(!replace){
      setHistory(prev => ([...prev, mode]))
      //setHistory(history.concat(mode));
    }
  }
  function back() {
    if(history.length > 1){
      setMode(history.pop());
    } else {
      setMode(history[0])
    }
  }

  return { mode, transition, back };
}


 