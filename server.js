const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Placeholder Route
app.get('/', (req, res) => {
    res.send('Backend API Placeholder. The frontend is currently running in independent mode.');
});

app.listen(PORT, () => {
    console.log(`Placeholder server running on port ${PORT}`);
});
