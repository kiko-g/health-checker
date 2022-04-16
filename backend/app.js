const express = require('express');
const app = express();
const infectious = require('./routes/infectious');

app.use('/', infectious);

app.listen(3000);
