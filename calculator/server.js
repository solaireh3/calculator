const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3100;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for calculation
app.post('/calculate', (req, res) => {
  const { price, time } = req.body;
  const depreciationRate = 0.05; // 假设每月折旧5%
  const remainingValue = (price * Math.pow(1 - depreciationRate, time)).toFixed(2);
  res.json({ remainingValue });
});

// Handle all other routes by serving index.html (for SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
