const express = require('express');
const path = require('path');
const db = require('./data/queries');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// settings for Heroku deployment
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

/**
 * REST End points
 **/

app.get('/api/ping', (req, res) => {
    res.send({ express: 'pong' });
});

app.post('/api/records', (req, res) => {
    db.addRecord(req, res);
});

app.get('/api/records', (req, res) => {
    db.getRecords(req, res);
});

app.get('/api/records/:id', (req, res) => {
    db.getRecord(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));