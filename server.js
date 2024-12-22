const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const swaggerOptions = require('./config/swaggerOptions');
const accountRoutes = require('./routes/accountRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use('/api', accountRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
