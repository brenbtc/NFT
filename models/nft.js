const mongoose = require('mongoose');
const nftSchema = new mongoose.Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    floorPrice: {type: String, required: true},
    currentPrice: {type: String, required: true},
    owners: {type: Number, required: false},
})

module.exports = mongoose.model('NFT', nftSchema);