const express = require('express');
require('./database/db')
const cors=require('cors');
const dotenv = require('dotenv').config();

const computerroute=require('./routes/computer');
const categorieroute=require('./routes/categorie');
const commentsroute=require('./routes/comments');
const annonceurroute=require('./routes/annonceur');
const adminroute=require('./routes/admin');

const favoriesroute=require('./routes/favories');
const app = express()
app.use(express.json());

app.use(cors());
app.use('/annonceur', annonceurroute);
app.use('/favories',favoriesroute)
app.use('/users', adminroute);
app.use('/computer',computerroute);
app.use('/categorie',categorieroute);
app.use('/comments', commentsroute);

app.use('/getphoto',express.static('./uploads'))

app.listen(5000,()=>{
    console.log('server work');
})

