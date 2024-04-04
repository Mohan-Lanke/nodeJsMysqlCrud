const express = require("express");
const colors = require("colors")
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

// configure dotenv
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"))

app.get('/test', (req,res)=>{
    res.status(200).send('<h1>Nodejs Mysql App</h1>')
})

//port
const port = process.env.port ;

//conditionally listen
mySqlPool.query('SELECT 1').then(()=>{
    console.log("Connected to Db".bgCyan.white)
    //listen
    app.listen(port,()=>{
        console.log(`runningggggggggggggg on ${port}`.bgMagenta.white)
    })
}).catch((error)=>{
    console.log(error)
})
