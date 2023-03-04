const express = require('express');
require('./database/db')
const cors=require('cors');
const computerroute=require('./routes/computer');
const categorieroute=require('./routes/categorie');
const app=express();

app.use(express.json());

app.use(cors());


app.use('/computer',computerroute);
app.use('/categorie',categorieroute);
app.use('/getphoto',express.static('./uploads'))

app.listen(5000,()=>{
    console.log('server work');
})

