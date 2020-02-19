import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
console.log(useVisualMode)

export default function Appointment(props) {
  console.log(props.onAdd)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    )
  return (
  <article className="appointment">
    <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={()=> transition(CREATE, true)} />}
  {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={props.onEdit} 
    onDelete={props.onDelete}
    />
    )}
    {mode === CREATE && (
    <Form
    interviewers={[]}
       onSave={props.onSave}
       onCancel={() => back()}
    />
    )}
  </article>)
    
    
  };

    
    
    //  { props.interview  ? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} 
    // onDelete={props.onDelete}/> : <Empty onAdd={props.onAdd} /> }

    // import Confirm from "components/Appointment/Confirm.js";
// import Status from "components/Appointment/Status.js";
// import Error from "components/Appointment/Error.js";



