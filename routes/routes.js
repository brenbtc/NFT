const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const NFT = require('../models/nft');
const multer = require('multer');

//Image Upload 
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../public/assests')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+ '_' + Date.now() + '_' + file.originalname);
    },
})

var upload = multer({
    storage: storage, 
}).single('image');

router.get('/', (req, res) => {
    res.render( 'index',{title: "SilqeeNFTs"});
});

router.get('/create', (req, res) => {
    res.render("create_nft", {title: "Creation"})
});

router.get('/artists', (req, res) => {
    res.render("artists", {title: "Artists"})
});

router.get('/about', (req, res) => {
    res.render("about", {title: "About"})
});

router.get('/jobs', (req, res) => {
    res.render("jobs", {title: "Jobs"})
});


module.exports = router;