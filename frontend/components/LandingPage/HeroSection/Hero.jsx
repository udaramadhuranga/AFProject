import React,{useState,useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import MainImage from "url:../../../src/img/Hero-main.svg";
import PathImage from "url:../../../src/img/Path.svg";
import HalfElipse from "url:../../../src/img/HalfElipse.svg";
import FullElipse from "url:../../../src/img/Ellipse.svg";
import "../../../public/style.css";
import { UilNavigator } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import { UilBuilding } from '@iconscout/react-unicons';
import CountTime from './CountTimer';

import {useDispatch,useSelector} from 'react-redux';
import {getconference} from '../../../src/actions/conference';
import {Grid,CircularProgress,Card,CardActions,CardContent,CardMedia,Typography } from '@material-ui/core'
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

const buttonStyle = {
    backgroundColor: "#5E4FA2",
    color: "#FEC949",
    fontWeight: 500,
    fontSize: "13px",
    fontFamily: 'Montserrat',
    height: "50px",
    borderRadius: "8px",
    zIndex: "99"
}

const elipseOne = {
    top : "16%",
    left : "7%",
    width : "7%"
}

const elipseTwo = {
    bottom : "20%",
    right : "30%",
    width : "12%"
}

function Hero(post){

          //dispatch getconference details redux
        
    const [currentId,setCurrentId] = useState(null);
        
   
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getconference());

    },[currentId,dispatch])


    //to get data from goloble store use useselector

    const eventposts = useSelector((state)=>state.conference)



    return (<div className="heroStyle" id="home">
        <Container fluid>
            <img src={PathImage} className= "pathStyle"/>
            <img src={FullElipse} className="fullElipse" style={elipseOne}/>
            <img src={FullElipse} className="fullElipse" style={elipseTwo}/>

            { eventposts.map((post,index)=>{ 
                    return(
                        <div>
            <Row className="wholeRow">
                <Col lg={6} sm={12} className="wholeColumn">
                    <h1 className= "h1Style" >{post.Title}</h1>
                    <hr width="40%" align="left" className="hrStyle"/>
                    <p className= "pStyle" >{post.description}</p>

                    <Button style={buttonStyle} > Contact us Today <UilNavigator size= "35px" style={{paddingLeft:"5%"}}/></Button>
                    <img src={HalfElipse} className="halfEStyle" />
                </Col>
                <Col lg={6} sm={12}>
                    <img src={MainImage} className="imageStyle" />
                </Col>
            </Row>
            
            <Row>
                <Col lg={6} className="d-flex justify-content-end" >
                    <div className="confDetails ShadowL" data-aos="fade-up">
                        <Row>
                        <Col lg={6} >
                            <UilCalendarAlt size="100" color="#5E4FA2" className="pl-4 pt-3"/>
                        </Col>
                        <Col lg={6} className="pt-3 pl-0">
                            <div className="confText">{post.startingDate}</div>
                            <div className="confText">to</div>
                            <div className="confText">{post.endDate}</div>
                        </Col>

                        </Row>
                    </div>
                </Col>
                            

                <Col lg={6} className="pl-5 d-flex justify-content-start" style={{paddingLeft: "80px"}}>
                    <div className="confDetails ShadowR" data-aos="fade-up">
                        <Row>
                            <Col lg={6} >
                                <UilBuilding size="100" color="#5E4FA2" className="pl-4 pt-3"/>
                            </Col>
                            <Col lg={6} className="pt-4 pl-0">
                                <div className="confText">{post.Venue}</div> <br/>
                                <div className="confText"></div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            </div>
                    )})}
            <Row className="my-4">
                <Col lg={12} className="d-flex justify-content-center" data-aos="fade-up">
                    <CountTime />
                </Col>
            </Row>
        </Container>
    </div>);
}

export default Hero;