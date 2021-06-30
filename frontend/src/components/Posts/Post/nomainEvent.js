import React from 'react';
import Styles from './style'
import {Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {useDispatch}  from 'react-redux';
import {updateapprovel,updateDecline} from '../../../actions/eventPosts'


const EventPost = ({post,setCurrentId})=>{
    const classes = Styles();
    const EventDispatch = useDispatch();
    return(
        <Card className={classes.card}>

            <CardMedia className={classes.media}  image ={post.selectedfile} title={post.event} />

            <div className={classes.overlay}>
                
                <Typography variant="h6">Date :{post.date}</Typography>
                <Typography variant="h6">Duration :{post.duration}</Typography>
                <Typography variant="h6">Conductor :{post.conductor}</Typography>
                <Typography variant="h6">Type :{post.Mtype}</Typography>


            </div>
            <div className={classes.overlay2}>
            
                <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize = "default" />


                </Button>

            </div>


            <CardContent>
            <Typography variant="h5" color="textPrimary">Event :{post.event}</Typography>
            <Typography  variant="body2" color="textSecondary" gutterBottom>Desciption: {post.description}</Typography>
            </CardContent>
                        

            <CardActions className= {classes.cardActions}> 
                
                <Button size ="small" color="primary" onClick={()=>EventDispatch(updateapprovel(post._id,{event: post.event,description:post.description,date:post.date,duration:post.duration,approvel:'approved',selectedfile:post.selectedfile,conductor:post.conductor,Mtype:post.Mtype}),window.location.reload(false))} >
            
                    
                    approve

                    
                </Button>


                <Button size ="small" color="primary" onClick={()=>EventDispatch(updateDecline(post._id,{event: post.event,description:post.description,date:post.date,duration:post.duration,approvel:'decline',selectedfile:post.selectedfile,conductor:post.conductor,Mtype:post.Mtype}),window.location.reload(false))} >
            
                    
            decline

            
        </Button>


        

                
            </CardActions>



        </Card>
    )
}

export default EventPost;