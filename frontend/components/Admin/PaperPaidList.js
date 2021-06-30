import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";

export default function PaperPaidList() {
    const [userType, seTuserType] = useState('')
    const [PaperPaids, setPaperPaids] = useState([]);

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


        function getList() {
            axios.get("http://localhost:8070/payment/allpayments").then((res) => {
                //console.log(res)
                setPaperPaids(res.data.data)
            }).catch((err) => {
                alert(err.message)
            })
        }

        getList();

    })


    return (

        <div>
            <AppBarComponent getUserType={userType} />
            <div className="container">
                <div className="dialog-title" style={{marginBottom:"5%"}}>
                    List Research Paper paids
                    <hr className="workshopStyle" />
                </div>
                {
                    PaperPaids.map(PaperPaids => (
                        <div className="d-flex justify-content-center">
                            <div key={PaperPaids._id} className="confDetails ShadowL" style={{ height: "fit-content" }}>

                                <div className="card-body">
                                    <p className="card-text"><strong>Amount :</strong> {PaperPaids.amount}</p>
                                    <p className="card-text"><strong>Type :</strong> {PaperPaids.type}</p>
                                    <p className="card-text"><strong>Date :</strong> {PaperPaids.PaidDate}</p>

                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}