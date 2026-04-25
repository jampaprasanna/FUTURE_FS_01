const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Load HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact API
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error saving data");
        } else {
            res.send("Message saved successfully!");
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});