import React, { useEffect, useState } from 'react';
import AppBarComponent from "../../LandingPage/AppBar/AppBarComponent";
import "../../../public/Styles/editworkshop.css";
import { Col, Container, Row } from "react-bootstrap";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditClock from "url:../../../src/img/Clock-edit.svg";
import Typography from '@material-ui/core/Typography';
import { UilFolderDownload } from '@iconscout/react-unicons'
import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import axios from "axios";
import Button from '@material-ui/core/Button';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1.5),
        width: '400px'
    },
}));

const buttonColor = {
    backgroundColor: "#5E4FA2",
    color: "white",
    fontFamily: "Poppins",
    borderRadius: "7px",
    margin: "5% 0",
    width: "fit-content",
    width: "120px"
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#5E4FA2",
        },
    },
});


function ViewWorkshops(props) {

    const [workshop, setWorkshop] = useState({
        topic: "",
        description: "",
        date: "",
        time: "",
        image: "",
        pdf: "",
        file_path: "",
        file_mimetype: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setWorkshop(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleClick() {
        axios.put(`http://localhost:8070/workshops/change/${props.match.params.id}`, workshop);
        setOpen(true);
    }

    useEffect(() => {

        axios.get(`http://localhost:8070/workshops/${props.match.params.id}`).then(res => {
            setWorkshop(res.data);
        })
    }, []);

    const downloadItem = async () => {
        await axios.get(`http://localhost:8070/workshops/download/${props.match.params.id}`).then(res => {
            console.log(res.data);
        })
    }








    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (<div>
        <AppBarComponent />

        <Container>
            <Row className="align-middle" >

                <Col lg={12}>
                    <div className="editForm">
                        <div className="dialog-title">
                            {workshop.topic}
                            <hr className="workshopStyle" style={{ width: "20%" }} />
                        </div>
                        <img src={workshop.image} className="clockImage" style={{ marginTop: "3%" }} />
                        <div>
                            <Typography className="card-topic" style={{ fontWeight: "500", margin: "5% 10%" }} variant="span" component="h2">
                                {workshop.description}
                            </Typography>

                            <div className="d-flex justify-content-center">
                                <div className="dateBack" style={{ width: "200px", height: "75px", textAlign: "center", paddingLeft: "0%", paddingTop: "2%"}}>
                                <Typography className="card-topic" variant="span" component="h2" style={{ color: "#FEC949" }}>
                                    Date: {workshop.date}
                                </Typography>

                                <Typography className="card-topic" variant="span" component="h2" style={{ color: "#FEC949" }}>
                                    Time: {workshop.time}
                                </Typography>
                            </div>
                        </div>
                        <Button onClick={downloadItem} style={buttonColor}><UilFolderDownload style={{ marginRight: "10%" }} />PDF</Button>
                    </div>

                        
                    </div>
                </Col>
            </Row>
        </Container>
    </div >)
}

export default ViewWorkshops;