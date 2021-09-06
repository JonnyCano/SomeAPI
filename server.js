const express = require('express');
const app = express();
const { fuckYOU } = require('./data/psycho');

app.listen(3001, () => {
    console.log('API server now on port 3001!');
})