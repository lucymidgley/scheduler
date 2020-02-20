import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";



export default function Appointment(props) {
  console.log(props.onAdd)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    )
    function save(name, interviewer) {
      transition(SAVING)
      console.log(name)
      console.log(props)
      const interview = {
        student: name,
        interviewer
      };
      const id=props.id;
      props.bookInterview(id, interview).then(() => transition(SHOW))
      
    }

    function deleteInt() {
      transition(DELETING)
      const id = props.id;
      props.cancelInterview(id).then(()=> transition(EMPTY))
    }



  return (
  <article className="appointment">
    <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={()=> transition(CREATE, true)} />}
  {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={props.onEdit} 
    onDelete={() => transition(CONFIRM)}
    />
    )}
    {mode === CREATE && (
    <Form
    interviewers={props.interviewers}
       onSave={(name, interviewer) => { save(name, interviewer)}}
       onCancel={() => back()}
    />
    )}
    {mode === SAVING && (
    <Status message="Saving" />
    )}
    {mode === DELETING && (
    <Status message="Deleting" />
    )}
    {mode === CONFIRM && (
    <Confirm 
    message={"Delete the appointment?"}
    onCancel={() => transition(SHOW)}
    onConfirm={()=> deleteInt()}
    />
    )}

  </article>)
    
    
  };

    
    
    //  { props.interview  ? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} 
    // onDelete={props.onDelete}/> : <Empty onAdd={props.onAdd} /> }




