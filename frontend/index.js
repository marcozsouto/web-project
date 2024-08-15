const express = require('express');
require('dotenv').config()
const app = express();
const path = require('path');
const port = process.env.PORT;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/js/config.js', (req, res) => {
    res.type('application/javascript');
    res.send(`
        const config = {
            apiUrl: '${process.env.API_URL}'
        };
    `);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

app.get('/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tables.html'));
});

app.listen(port, () => {
    console.log(`Running at port ${port}`);
});
