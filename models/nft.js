const mongoose = require('mongoose');
const nftSchema = new mongoose.Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    floorPrice: {type: String, required: true},
    bestOffer: {type: String, required: true},
    owners: {type: Number, required: true},
    action: {type: Number, required: true}
})

module.exports = mongoose.model('NFT', nftSchema);