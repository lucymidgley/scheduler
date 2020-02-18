import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerClass} onClick={props.onChange}>
      <img className="interviewers__item-image" 
      src={props.avatar}
      alt={props.name} />
      {props.selected && props.name} 
    </li>
  );
}


// only show name if selected!!