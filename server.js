// Imports 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session');
const methodOverride = require('method-override')
const nftRoutes = require('./controllers/routes')

const app = express();
const PORT = process.env.PORT || 3000; 
const mongodbURI = process.env.MONGODBURI

//Database connection
mongoose.connect(process.env.MONGODBURI, {useNewUrlParser: true,   useUnifiedTopology: true,  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log('Connected to the database'))

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(session({
    secret: 'Secret Key',
    //Protects the session 
    saveUninitialized: true,

    resave: false,
    //Forces session to be saved back to Store
}));

app.use((req,res,next)=> {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

//Set Template
app.set('view engine', 'ejs');

//Route Prefix
app.use('', nftRoutes);
app.use(express.static('./uploads'));

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${port}`)
});

