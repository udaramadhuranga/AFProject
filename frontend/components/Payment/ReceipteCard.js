import React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

function ReceiptCard(props) {
    return (
        <div>
            <Paper elevation={7} style = {{width:"300px",marginTop:"2%", padding:"2% 0"}}>
            <Typography variant="subtitle1"><strong>Item ID :</strong> {props.itemId}</Typography>
            <Typography variant="subtitle1"><strong>Price :</strong> Rs. {props.itemPrice}.00</Typography>
            </Paper>
        </div>
    )

}

export default ReceiptCard;