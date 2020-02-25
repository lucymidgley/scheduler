import React, {useEffect} from "react";
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
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const INCOMPLETE = "INCOMPLETE";
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
      if(interviewer){
      transition(SAVING, true)
      const interview = {
        student: name,
        interviewer
      };
      const id=props.id;
      props.bookInterview(id, interview).then(() => transition(SHOW)).catch(error => transition(SAVERROR, true))
    } else {transition(INCOMPLETE)} 
    }
    
    function deleteInt() {
      transition(DELETING, true)
      const id = props.id;
      props.cancelInterview(id).then(()=> transition(EMPTY)).catch(error => transition(DELERROR, true))
    }

    useEffect(() => {
      if (props.interview && mode === EMPTY) {
          transition(SHOW);
      }
      if (props.interview === null && mode === SHOW) {
       transition(EMPTY);
      }
     }, [props.interview, transition, mode]);


  return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
  {mode === SHOW && props.interview &&  (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={() => transition(EDIT)} 
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
   {mode === INCOMPLETE && (
   <Error message="Please fill in name and select an interviewer" onClose={() => back()} />
   )}
    {mode === CONFIRM && (
    <Confirm 
    message={"Delete the appointment?"}
    onCancel={() => transition(SHOW)}
    onConfirm={() => deleteInt()}
    />
    )}

  </article>)
    
    
  };

    
    
    




