import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";

export default function participent() {
    const [userType, seTuserType] = useState('')
    const [participents, setParticipents] = useState([]);
    useEffect(() => {
        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
            console.log(access_token)
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            axios.get('http://localhost:8070/user/post', config).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {
                    seTuserType(response.data.user.usertype)

                }
            })
                .catch()
        };
        getusertype();

        function getParticipents() {
            axios.get("http://localhost:8070/payment/getparticipents").then((res) => {
                //console.log(res)
                setParticipents(res.data.data)
            }).catch((err) => {
                alert(err.message)
            })
        }

        getParticipents();

    })


    return (

        <div>
            <AppBarComponent getUserType={userType} />
            <div className="container">
            <div className="dialog-title" style={{ marginBottom: "10%" }}>
                participent List
                <hr className="workshopStyle" style={{width:"10%"}} />
            </div>
            {
                participents.map(participents => (
                    <div className="d-flex justify-content-center">
                    <div key={participents._id} className="confDetails ShadowL" style={{ height: "fit-content", width:"100%" }}>

                        <div className="card-body">
                        <p className="card-text"><strong>Amount :</strong> {participents.amount}</p>
                        <p className="card-text"><strong>Type : </strong>{participents.type}</p>
                        <p className="card-text"><strong>Date : </strong>{participents.PaidDate}</p>

                        </div>
                    </div>
                    </div>
                ))
            }
    </div>
        </div>
    )
}