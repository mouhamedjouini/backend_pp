const express = require('express');
var bodyParser = require('body-parser');
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

var jsonParser = bodyParser.json({limit:1024*1024*10, type:'application/json'}); 
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*10,type:'application/x-www-form-urlencoded' });
app.use(jsonParser);
app.use(urlencodedParser);

app.use(cors());
app.use('/annonceur', annonceurroute);
app.use('/favories',favoriesroute)
app.use('/users', adminroute);
app.use('/computer',computerroute); 
app.use('/categorie',categorieroute);
app.use('/comments', commentsroute);
//app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb', extended: true })); 
 app.use('/getphoto',express.static('./uploads'))

app.use(jsonParser);
app.use(urlencodedParser);
app.listen(5000,()=>{ console.log('server work');})

