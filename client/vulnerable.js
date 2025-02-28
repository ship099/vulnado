const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
// Insecure API key exposure
const API_KEY = "hardcoded-api-key-123";
// Cross-Site Scripting (XSS)
app.get('/search', (req, res) => {
    const userInput = req.query.q;
    res.send(`<h1>Results for ${userInput}</h1>`); // No sanitization!
});
// Prototype Pollution (Potential Remote Code Execution)
const merge = (target, source) => {
    for (let key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            target[key] = merge(target[key] || {}, source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
};
let obj = {};
merge({}, JSON.parse('{"__proto__": {"polluted": "yes"}}'));
if ({}.polluted) {
    console.log("Prototype Pollution vulnerability exists!");
}
app.listen(3000, () => console.log("Server running on port 3000"));