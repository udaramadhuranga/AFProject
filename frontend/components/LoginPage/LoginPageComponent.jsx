import React, { useState, useEffect } from 'react';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import MiddleSection from "./MiddleSection";
import axios from 'axios';


function LoginPageComponent(){

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
  }, []);

    return(<div>
        <AppBarComponent getUserType={userType}/>
        <MiddleSection />
    </div>);
}

export default  LoginPageComponent;