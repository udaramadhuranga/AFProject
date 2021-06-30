import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import axios from 'axios';
import {useHistory} from "react-router-dom"


const h1Style = {
    color: "#5E4FA2",
    fontSize: "45px",
    fontWeight: "600",
    fontFamily: "Montserrat"
}

const inputBoxStyle = {
    width: "500px"
}

function Registraion() {

    const location = useLocation();
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [usertype, setUser] = useState("")
    const [check, setCheck] = useState("")
    const [UserType, seTuserType] = useState('')
    const history = useHistory()

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


    function register(e) {

        e.preventDefault();

        const newUSer = {
            username,
            email,
            password,
            usertype
        }
         if (check != "true") {
            alert("accept terms and conditions")
        } else {

            axios.post("http://localhost:8070/user/register", newUSer).then((response) => {
                if (response.data.Error) {
                    alert(response.data.Error)
                    document.getElementById("myForm").reset();
                } else {
                    document.getElementById("myForm").reset();
                    history.push("/signin")

                }
            }).catch((err) => {
                alert(err)
            })
        }
    }

    return (
        <div>

            <div className="container">
                <AppBarComponent getUserType={UserType}/>
                <h1 className="h1Style" >Sign In</h1>
                <form id="myForm">
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">User Name</label>
                        <input required style={inputBoxStyle} type="text" id="name" placeholder="Enter Username"
                            onChange={(event) => {
                                setName(event.target.value)
                            }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Email</label>
                        <input required style={inputBoxStyle} type="text" id="emaill" placeholder="Enter Email"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }} 
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Password</label>
                        <input required style={inputBoxStyle} type="password" id="pass" placeholder="Enter Password"
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }} />
                    </div>
                    <div>
                        <label >User Type</label>
                        <div>
                            <input type="radio" name="user" value="researcher" id="flexRadioDefault1" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Reacher
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="workshop" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Workshop Conductor
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="attendee" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Attendeee
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="admin" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Admin
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="reviewer" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Reviewer
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="editor" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Editor
                            </label>
                        </div>
                    </div>
                    <br />
                    <input type="checkbox" value="true" id="flexCheckDefault" onChange={(event) => {
                        setCheck(event.target.value)
                    }} />
                    <label>
                        I agreed terms and conditions.
                    </label>
                    <br />
                    <div>
                        <button type="submit" className="btn btn-primary" onClick={register}>Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Registraion;
