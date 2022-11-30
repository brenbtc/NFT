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

// root
router.get('/', async (req, res) => {
    const nfts = await NFT.find();
    res.render( 'index',{title: "SilqeeNFTs", nfts: nfts});
});

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


router.get('/create', (req, res) => {
    res.render("create_nft", {title: "Creation"})
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

//Edit NFT Route
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    const nft = await NFT.findById(id)
    res.render('edit_nft', { NFT:nft, title:'title' });
});

router.put('/:id', async (req, res) =>{
    let nft = await NFT.findById(req.params.id);
    nft.name = req.body.name
    nft.floorPrice = req.body.floorPrice
    nft.currentPrice = req.body.currentPrice
    if(req.body.img) nft.img = req.body.img
    nft = await nft.save();
    res.redirect('/')
})

router.delete('/:id', async (req, res) => {
    await NFT.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


//artist routes
router.get('/artists/new', (req, res) => {
    res.render("new_artist", {title: "New Artist"})
});

router.post('/artist/new', upload, (req, res) =>{
    const artist = new Artist({
        name: req.body.name,
        creations: req.body.creations,
        owned: req.body.owned,
        liked: req.body.liked,
        about: req.body.about,
    });
    artist.save((err) => {
        if(err){
            res.json({message: err.message, type: 'danger'})
        } else {
            req.session.message = {
                type: 'success',
                message: 'NFT added successfully'
            }
            res.redirect('/artists');
        }
    })
})

router.get('/artists', async (req, res) => {
    const artists = await Artist.find().sort({ owned: 'asc' });
    res.render("artists", { title: "Artists", artists: artists })
});

router.delete('/artist/:id', async (req, res) => {
    await Artist.findByIdAndDelete(req.params.id);
    res.redirect('/artists');
})


module.exports = router;