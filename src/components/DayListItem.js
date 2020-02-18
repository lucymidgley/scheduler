import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected
  });

  const formatSpots = function(number) {
    if(Number(number) > 1){
    return `${number} spots remaining`
    } 
    else if(Number(number) === 0) {
     return `no spots remaining` 
  }
     else return `${number} spot remaining`
  }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}