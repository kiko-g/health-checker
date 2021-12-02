const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Infectious Diseases endpoint")
});

module.exports = router;