const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const terrainRoutes = require('./routes/terrain');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/terrains', terrainRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found." });
});

module.exports = app;
