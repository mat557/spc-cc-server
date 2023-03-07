const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToServer } = require('./utils/dbConnect');
const app = express();
const port = process.env.PORT || 5001;
const appApi = require('./routes/v1/users.routes.js');


app.use(cors());
app.use(express.json());


connectToServer((err)=>{
    if(!err){
            app.listen(port,()=>{
                console.log(`Running Spectrum CC server at port :${port}`);
            })
        }
        else{
            console.log(err);
    }
})



app.use('/api/v1/app/user',appApi);

app.all('*',(req,res)=>{
    res.send("The requested route cannot be found!");
})

app.get('/',(req,res)=>{
    res.send("The server is responding successfully!");
})