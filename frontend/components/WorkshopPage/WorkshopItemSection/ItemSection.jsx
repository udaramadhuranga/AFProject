import React, { useEffect, useState } from "react";
import AddCard from './WorkshopAddCard';
import ItemCard from './WorkshopItemCard'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../../public/Styles/itemSection.css";
import ItemForm from './ItemForm';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import LoadingAnimation from "./LoadingAnimation";
import zIndex from "@material-ui/core/styles/zIndex";

import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css'; 

AOS.init();
var userType = "workshop";

function ItemSection() {

    const [workshop, setWorkshop] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [userType, setUserType] = useState('')
    const [id, setId] = useState('')

    function addWorkshop(newWorkshop) {
        axios.post('http://localhost:8070/workshops/add', newWorkshop);
        /*setWorkshop(prevWorkshops =>{
            return [...prevWorkshops, newWorkshop]
        });*/
    }

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
                  console.log(response.data.user.usertype);
                  setUserType(response.data.user.usertype);
                  setId(response.data.user._id)
                    
                }
              })
              .catch()
        };
        getusertype();
        retrieveWorkshops();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const retrieveWorkshops = async () => {

        /*************************** */
      /*  const access_token = localStorage.getItem('token')
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
                console.log(response.data.user.usertype);
                setUserType(response.data.user.usertype)
                setId(response.data.user._id)


            }
        })
            .catch()*/
        /*****************************************/


        try {
            const data = await axios.get("http://localhost:8070/workshops/").then(res => {
                setWorkshop(res.data)
            });
            setLoading(true)
        } catch (e) {
            console.log(e);
        }
    }


    function workshopDelete(id) {

        axios.delete(`http://localhost:8070/workshops/remove/${id}`).then((res) => {
            console.log("Delete SuccessFully.");
        }).catch((err) => {
            console.log(err);
        });
    }



    return (
        <div className="container">
            <div className="row">


                <div className="itemBox" data-aos="zoom-in-up">

                    {loading ? workshop.map((workshopCard, index) => {
                        return (
                            <div className="col-md-6 col-lg-4 col-sm-12" style={{ cursor: "pointer" }}>
                                <ItemCard
                                    key={index}
                                    id={workshopCard._id}
                                    image={workshopCard.image}
                                    topic={workshopCard.topic}
                                    description={workshopCard.description}
                                    date={workshopCard.date}
                                    time={workshopCard.time}
                                    onDelete={workshopDelete}
                                    getUserType={userType}
                                />
                            </div>
                        )
                    })
                        :
                        <div className="mx-auto" style={{ position: "absolute", top: "45%", right: "35%" }}>
                            <LoadingAnimation />
                        </div>
                    }
                </div>

                <div className="col-lg-4" onClick={handleClickOpen} style={{ cursor: "pointer" }}>
                    <AddCard />
                </div>

            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    <div className="dialog-title">
                        Lets Schedule a new workshop.
                        <hr className="workshopStyle" />
                    </div>
                </DialogTitle>

                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                    <ItemForm
                        addWorkshops={addWorkshop}

                    />

                </DialogContent>
                <DialogActions>
                    {/*  <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button> */}
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ItemSection;