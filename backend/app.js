const express = require('express');
const app = express();
const infectiousRoute = require('./routes/infectious');

app.use('/infectious', infectiousRoute);

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.listen(3000);