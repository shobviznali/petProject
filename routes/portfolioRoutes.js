const express = require('express');
const portfolioRouter = express.Router();


portfolioRouter.get('/portfolio', (req, res) => {
    res.send("Portfolio page");
});

portfolioRouter.post('/portfolio', (req, res) => {
    res.send("Partfolio added");
});

portfolioRouter.put('/portfolio/:id', (req, res) => {
    res.send('Portfolio change');
});

portfolioRouter.delete('/portfolio/:id', (req, res) => {
    res.send("Portfolio delete");
});

module.exports = portfolioRouter;