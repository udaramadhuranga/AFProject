import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import { validate } from "react-email-validator";
import paid from "url:../../src/img/ticket.jpg"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const crypto = require("crypto");

var userType="";

const loginStyle = {
    width: '400px',
    heigth: 'auto',
    padding: '5% 10% 0%',

}

const loginButton = {
    margin: '5% 2.5% 5%',
    backgroundColor: '#5E4FA2',
    width: "200px"
}

const paperStyle = {
    width: "30%",
    heigth: "auto",
    padding: "2.5%",
    position: "absolute",
    top: "10%",
    left: "30%"
}

export default function Buyticket() {

    const referenceid = crypto.randomBytes(16).toString("hex");

    console.log(referenceid);



    const history = useHistory();
    const buy=()=>{
        history.push('/payment',{
            type:'ticket',
            ref:referenceid
        })
      }



    return (
        <div>
            <AppBarComponent getUserType={userType}/>
        
        <div className="container">
       
            <Grid container spacing={3} align="center" justify="center" alignItems="center">

                <Paper style={paperStyle} elevation={11} >
                    <Grid align="center">
                        <Typography variant="h4" style={{ color: "#5E4FA2", fontWeight: 700, marginBottom: "5%", fontFamily: 'Poppins'}}>Your Ticket</Typography>
                    </Grid>
                    <Grid>
                        <img src={paid} style={{ width: "300px" }} />
                    </Grid>
                  
                    <Grid>
                        <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} onClick={()=>buy()}>
                           Buy
                            </Button>

                    </Grid>
                    <Grid>
                        <h6>Your Reference Number : {referenceid}</h6>
                       Ticket Price 2000/=
                    </Grid>


                </Paper>


            </Grid>

            
        </div>

        </div>


    )
}