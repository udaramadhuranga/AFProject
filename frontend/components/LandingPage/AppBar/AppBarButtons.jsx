import React from "react";
import Button from "@material-ui/core/Button";

const buttonInStyle = {
    color: "#5E4FA2",
    border: "1px solid #5E4FA2",
    fontWeight: 600,
    fontSize: "15px",
    fontFamily: 'Montserrat',
    zIndex: "99",
    marginLeft: "25px"
}

const buttonUpStyle = {
    color: "#5E4FA2",
    backgroundColor:"#FEC949",
    fontWeight: 600,
    fontSize: "15px",
    fontFamily: 'Montserrat',
    zIndex: "99",
    marginLeft: "25px"
}

function AppBarButtons(){


    var ch = ""
if('token' in localStorage){    
    ch = "no"
}else{
    ch = "yes"
}

function logout(){
    localStorage.removeItem('token')
}

    return ( <div>
            <Button hidden={ch == "no"}variant="outlined" style={buttonInStyle} href="/signin">Sign In</Button>
            <Button hidden={ch == "no"}variant="outline-success" style={buttonUpStyle} href="/registration" >Sign Up</Button>
            <Button hidden={ch == "yes"} onClick={()=>{
                logout()
            }} variant="outline-success" style={buttonUpStyle} href="/signin" >Log Out</Button>
        </div>
        );
}

export default AppBarButtons;