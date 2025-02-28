const express = require('express');
const app = express();
const path = require('path');
const vulnerable = require('./vulnerable'); // Importing vulnerable routes
app.use(express.urlencoded({ extended: true }));
// Basic route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Vulnerable App</h1><p>Try accessing <a href="/search?q=test">/search?q=test</a></p>');
});
// Serve vulnerable endpoints
app.use(vulnerable);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`:rocket: Server running on http://localhost:${PORT}`);
});