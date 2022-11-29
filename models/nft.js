const mongoose = require('mongoose');
const nftSchema = new mongoose.Schema({
    img: {
        type: String, 
        required: true,
    },
    name: {
        type: String,
        required: true,
        },
    floorPrice: {
        type: Number,
        required: true,
        },
    currentPrice: {
        type: Number,
        required: true,
    },
    owners: {
        type: Number,
        required: false,
        default: 0},
})

module.exports = mongoose.model('NFT', nftSchema);