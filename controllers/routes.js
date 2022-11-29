const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');
const NFT = require('../models/nft');
const multer = require('multer');

//Image Upload 
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
})

let upload = multer({
    storage: storage, 
}).single('image');


//Insert NFT to database
router.post('/create', upload, (req, res) =>{
    const nft = new NFT({
        img: req.file.filename,
        name: req.body.name,
        floorPrice: req.body.floorPrice,
        currentPrice: req.body.currentPrice,
    });
    nft.save((err) => {
        if(err){
            res.json({message: err.message, type: 'danger'})
        } else {
            req.session.message = {
                type: 'success',
                message: 'NFT added successfully'
            }
            res.redirect('/');
        }
    })
})

router.get('/', async (req, res) => {
    const nfts = await NFT.find();
    res.render( 'index',{title: "SilqeeNFTs", nfts: nfts});
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

router.get('/contact', (req, res) => {
    res.render("contact", {title: "Contact"})
});


router.get('/jobs', (req, res) => {
    res.render("jobs", {title: "Jobs"})
});

router.get('/jobboard', (req, res) => {
    res.render("jobboard", {title: "JobList"})
});


module.exports = router;