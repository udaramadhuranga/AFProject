import React, { useState, useEffect } from 'react';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Items from "./WorkshopItemSection/ItemSection"
import TitleBar from "./DescriptionSection/TitleBar";
import axios from 'axios';

function WorkshopComponent() {

    const [userType, seTuserType] = useState('')

    useEffect(() => {
        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
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
      }, []);

    return(
        <div>
            <AppBarComponent getUserType={userType}/>
            <TitleBar />
            <Items />

        </div>
    );
}

export default WorkshopComponent;