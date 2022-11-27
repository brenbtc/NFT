const express = require('express');
const router = express.Router();

router.get('/nft', (req, res) => {
    res.send('All NFTs');
});

module.exports = router;