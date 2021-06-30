const express = require("express");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const path = require('path');
const app = express();
dotenv.config();
const PORT=process.env.PORT ||8070

app.use(cors());

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,

})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Mongo DB Connection success");
})

const userRouter = require("./routes/User/users");
app.use("/user",userRouter);

const PaymentRouter = require("./routes/AtmUser");
app.use("/onlinepay",PaymentRouter);

const PaidRouter = require("./routes/paidData");
app.use("/payment",PaidRouter);

const reviewRouter = require("./routes/reviewer");
app.use("/review",reviewRouter);


const workshopRouter = require("./routes/workshopsRoute");
app.use("/workshops",workshopRouter);

const eventrouter = require("./routes/events.js");
const conferencerouter =require("./routes/conference.js")

app.use("/mainevent",eventrouter);
app.use("/conference",conferencerouter);

const fileRoute = require("./routes/ResearchPaper/file");
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
});



