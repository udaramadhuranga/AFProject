import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom";
import download from 'downloadjs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";



const ViewWorkshop = () => {

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const history = useHistory()
    const [file, setFile] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [mess, setMessage] = useState('')
    const [userType, seTuserType] = useState('')
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const newhandleClose = () => {
      setOpen(false);
    };

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

      const getFile = async () => {
        try {
          const { data } = await axios.get("http://localhost:8070/review/getWorkshop", {params:{id:location.state.paperid}});
          setFile(data);
          console.log(data)
        } catch (error){
          error.response && setErrorMsg(error.response.data);
        }
      };
  
      getFile();
    }, []);
  
    function accept(id) {
  
      const body = {
        id: id,
        state: "Accepted"
      }
  
      axios.put("http://localhost:8070/review/updateWorkshop", body).then((res) => {
        alert("Accept success")
        window.location.reload(false)
      }).catch((err) => {
        console.log(err)
      })
  
    }
  
    function decline(id, userId) {
      setOpen(false);
      const body = {
        id: id,
        state: "Declined"
      }
      axios.put("http://localhost:8070/review/updateWorkshop", body).then((res) => {
        sendmessage(userId)
        window.location.reload(false)
      }).catch((err) => {
        console.log(err)
      })
    }
  
    function newfunction() {
      handleClose
    }
  
    function sendmessage(userId) {
      const message = {
        userID: userId,
        msg: mess,
        state: "unread"
      }
      console.log(message)
      axios.post("http://localhost:8070/review/sendmessage", message).then(() => {
      }).catch((err) => {
        console.log(err)
      })
    }
  
    return (
      <div className="container">
            <AppBarComponent/>
            <div className="row">
            <div className="itemBox">
                {file.map(({ _id, topic, description,date, time, userID, state ,file_path}) => (
                <div key={_id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>
                  <h3 >Titile : {topic}</h3>
                  <h3>State : {state}</h3>
                  <h3>userID : {userID}</h3>
                  <h3>date : {date}</h3>

                  <a href={file_path}>
                  Download
                </a>

                  <div>
                  <Button disabled={state == "Accepted"} variant="outlined" color="primary" onClick={(e) => {
                    accept(_id)
                  }}>Accept</Button>

                  <Button disabled={state == "Declined"} variant="outlined" color="primary" onClick={handleClickOpen}>
                    Decline
                  </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter your message</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message"
                        type="text"
                        fullWidth
                        onChange={(e) => {
                          setMessage(e.target.value)
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        decline(_id, userID)
                      }} color="primary">
                        Send
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                
                
                </div>
              ))}
            </div>
            </div>
                
        </div>
    );
  };
  
  export default ViewWorkshop;