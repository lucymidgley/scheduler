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
  const EDIT = "EDIT"
  const SAVERROR = "SAVERROR"
  const DELERROR = "DELERROR"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    )
    function save(name, interviewer) {
      transition(SAVING)
      const interview = {
        student: name,
        interviewer
      };
      const id=props.id;
      props.bookInterview(id, interview).then(() => transition(SHOW)).catch(error => transition(SAVERROR, true))
      
    }
    
    function deleteInt() {
      transition(DELETING, true)
      const id = props.id;
      props.cancelInterview(id).then(()=> transition(EMPTY)).catch(error => transition(DELERROR, true))
    }



  return (
  <article className="appointment">
    <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
  {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={() => transition(EDIT)} 
    onDelete={() => transition(CONFIRM, true)}
    />
    )}
    {mode === CREATE && (
    <Form
    interviewers={props.interviewers}
       onSave={(name, interviewer) => { save(name, interviewer)}}
       onCancel={() => back()}
    />
    )}
    {mode === EDIT && (
    <Form
    name={props.interview.student}
    interviewers={props.interviewers}
    interviewer={props.interview.interviewer.id}
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
    {mode === SAVERROR && (
   <Error message="Could not save appointment." onClose={() => back()} />
   )}
    {mode === DELERROR && (
   <Error message="Could not delete appointment." onClose={() => back()} />
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




