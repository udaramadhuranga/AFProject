import React from "react";
import "../../../public/Styles/card.css";
import Plus from "url:../../../src/img/workshop/plusCircle.svg";

function WorkshopAddCard(){

    return(
        <div>
            <div className="card-box d-flex justify-content-center ">
                <img src={Plus} style={{width:"75%", height:"auto"}}/>
            </div>
        </div>
    )
}

export default WorkshopAddCard;