const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));