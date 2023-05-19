const express = require('express');
require('./database/db')
const cors = require('cors');
const dotenv = require('dotenv').config();

<<<<<<< HEAD

const computerroute = require('./routes/computer');
const categorieroute = require('./routes/categorie');
const favoritesRoute = require('./routes/favoris'); // Import favorites route
const annonceurroute = require('./routes/annonceur');
const adminroute = require('./routes/admin');
=======
const computerroute=require('./routes/computer');
const categorieroute=require('./routes/categorie');
const commentsroute=require('./routes/comments');
const annonceurroute=require('./routes/annonceur');
const adminroute=require('./routes/admin');

const favoriesroute=require('./routes/favories');
>>>>>>> d26de5a3d47ad06adae211ba7b0693b2c5393be6
const app = express()
app.use(express.json());

app.use(cors());
app.use('/annonceur', annonceurroute);
app.use('/favories',favoriesroute)
app.use('/users', adminroute);
<<<<<<< HEAD
app.use('/computer', computerroute);
app.use('/categorie', categorieroute);
app.use('/favorites', favoritesRoute); // Use favorites route
app.use('/getphoto', express.static('./uploads'))
=======
app.use('/computer',computerroute);
app.use('/categorie',categorieroute);
app.use('/comments', commentsroute);

app.use('/getphoto',express.static('./uploads'))
>>>>>>> d26de5a3d47ad06adae211ba7b0693b2c5393be6

app.listen(5000, () =>
{
    console.log('server work');
})

