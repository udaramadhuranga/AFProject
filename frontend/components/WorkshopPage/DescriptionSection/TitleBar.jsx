import React from 'react';
import TitleCard from "./TitleCard";
import Calender from "url:../../../src/img/workshop/workCalender.svg"

function TitleBar(){
    return(
        <div>
            <TitleCard
                imgURL = {Calender}
                title = "Schedule a new workshop."
                description = "Here you able to schedule new workshop, update workshop details and cancel scheduled workshop."
            />
        </div>
    )
}

export default TitleBar;