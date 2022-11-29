// Imports 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session');

const app = express();
const port = process.env.port || 3000; 

//Database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log('Connected to the database'))

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'Secret Key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req,res,next)=> {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

//Set Template
app.set('view engine', 'ejs');

//Route Prefix
app.use('', require('./controllers/routes'));
app.use(express.static('./uploads'));

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
});

