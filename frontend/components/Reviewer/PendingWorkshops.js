import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";

function ItemSection(){
    const history = useHistory()
    const[workshop, setWorkshop] = useState([]);
    const [userType, seTuserType] = useState('')
    
    useEffect(() => {

        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
            console.log(access_token)
            let config = {
              headers: {
                'Authorization': 'Bearer ' + access_token
              }
            }
            axios.get('http://localhost:8070/user/post',config).then((response) => {
                if (response.data.message) {
                  alert(response.data.message)
                } else {
                    seTuserType(response.data.user.usertype)
                }
              })
              .catch()
        };
        getusertype();
        retrieveWorkshops();
    });

    function retrieveWorkshops(){
        axios.get("http://localhost:8070/workshops/").then(res=>{
                setWorkshop(res.data)
        });
    }

    function buttonclick(id){

        history.push("/VRWorkshop",{paperid:id})
     
     }

    return(
        <div className="container">
            <AppBarComponent getUserType={userType}/>
            <div className="row">
            <div className="itemBox">
                {workshop.map(({ _id, topic, description,date, time, userID, state }) => (
                <div key={_id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>
                  <h3>Titile : {topic}</h3>
                  <h3>Reviewed : {state}</h3>
                  <h3>date : {date}</h3>
                  <button onClick={(e)=>{
                      buttonclick(_id)
                  }}>View</button>
                </div>
              ))}
            </div>
            </div>
                
        </div>
    )
}

export default ItemSection;