import React, { useState, useRef, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(second, replace) {
    setMode(second)
    if(!replace){
      setHistory(history.concat(mode));
    }
  }
  function back() {
    setMode(history.pop());
  }

  return { mode, transition, back };
}

 